import Controller from "~/controllers/Controller";
import Media from '~/models/media';
import Resource from 'dotapp/services/media';
import async from "async";
import path from 'path';
import Storage from 'dotapp/services/storage';
import Config from 'dotapp/services/config';
import moment from 'moment';

export default class extends Controller {

    /**
     * Find one media file
     * @param req
     * @param res
     */
    findOne(req, res) {

        let id = req.param("id");

        Media.findById(id).populate("user").exec((error, media) => {
            if (error) return res.serverError(error);
            if (!media) return res.notFound(req.lang("media.errors.media_not_found"));
            return res.ok(res.attachPolicies(media, "media"));
        });
    }

    /**
     * Find all media files
     * @param req
     * @param res
     */
    find(req, res) {

        let query = Media.find();

        if (req.filled("q")) {
            query.where({$text: {$search: req.param("q")}});
        }

        if (req.filled("type")) {
            let type = req.param("type");
            let types = Array.isArray(type) ? type : type.toArray(",");
            query.where({type: {$in: types}});
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.populate("user");

        query.execWithCount((error, result) => {
            if (error) return res.serverError(error);
            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "media")
            });
        });
    }

    /**
     * Build a chart
     * @param req
     * @param res
     * @returns {*}
     */
    chart(req, res) {

        let duration = req.param("duration", 10);
        let period = req.param("period", "days");
        let start = req.param("start", moment().subtract(duration, period).format());
        let end = req.param("end", moment().format());

        let moment_start = moment(start);
        let moment_end = moment(end);

        let lists = [];
        let started = moment_start;

        while (true) {

            started = started.add(1, period);

            if (started <= moment_end) {
                lists.push(started.locale("en").format());
            } else {
                break;
            }
        }

        return async.map(lists, (date, callback) => {

            let query = Media.find();

            query.where({
                created_at: {
                    '$gte': moment(date).locale("en").startOf(period).format(),
                    '$lte': moment(date).locale("en").endOf(period).toDate()
                }
            });

            query.countDocuments((error, total) => {
                if (error) return callback(error);

                callback(null, {
                    date: moment(date).locale("en").startOf(period).format(),
                    total: total
                })
            });


        }, (error, result = []) => {
            return res.ok(result);
        });

    }

    /**
     * Find all media thumbnails
     * @param req
     * @param res
     */
    findThumbnails(req, res) {

        if (!req.can("media.view")) return res.forbidden();

        return res.ok(Config.get("media.image.thumbnails"));
    }

    /**
     * Find all media types
     * @param req
     * @param res
     */
    findTypes(req, res) {

        if (!req.can("media.view")) return res.forbidden();

        let types = Object.keys(Config.get("media.types")).map(type => {
            return {
                type: type,
                title: req.lang("media.types." + type)
            }
        });

        return res.ok(types);
    }

    /**
     * Find all media extensions
     * @param req
     * @param res
     */
    findExtensions(req, res) {

        if (!req.can("media.view")) return res.forbidden();

        return res.ok([].concat.apply([], Object.values(Config.get("media.types"))));
    }

    /**
     * Create a new media
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("media.create")) return res.forbidden();

        let payload = req.param("payload");

        Resource.create(payload, (error, media) => {
            if (error) return res.serverError(error);

            media.user = req.user.id;
            media.title = req.param("title", media.title);
            media.description = req.param("description", media.description);

            media.save((error, media) => {
                if (error) return res.serverError(error);
                if (media) return res.message(req.lang("media.events.created")).ok(media.id);
            });
        });
    }

    /**
     * Update media by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Media.findById(id, (error, media) => {
            if (error) return res.serverError(error);
            if (!media) return res.notFound(req.lang("media.errors.media_not_found"));

            if (!req.can("media.update", media)) {
                return res.forbidden(req.lang("media.errors.update_denied", {
                    media: media.id
                }));
            }

            media.title = req.param("title", media.title);
            media.description = req.param("description", media.description);

            media.save(error => {
                if (error) return res.serverError(error);
                return res.message(req.lang("media.events.updated")).ok(id);
            });
        });
    }

    /**
     * Update thumbnail by id
     * @param req
     * @param res
     */
    updateThumbnail(req, res) {

        let id = req.param("id");
        let size = req.param("size");
        let data = req.param("data");

        let sizes = Config.get("media.image.thumbnails")
            .map(thumbnail => thumbnail.name)
            .map(name => {
                return name;
            });

        if (sizes.indexOf(size) < 0) {
            return res.validationError(req.lang("media.errors.invalid_size"));
        }

        if (!req.filled("data")) return res.validationError(req.lang("media.errors.base64_required"));

        let matches = data.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);

        if (!matches || matches.length !== 3) {
            return res.validationError(req.lang("media.errors.invalid_base64"));
        }

        data = matches[2];

        Media.findById(id, (error, media) => {
            if (error) return res.serverError(error);
            if (!media) return res.notFound(req.lang("media.errors.media_not_found"));

            if (!req.can("media.update", media)) {
                return res.forbidden(req.lang("media.errors.update_denied", {
                    media: media.id
                }));
            }

            if (media.type !== "image") {
                return res.validationError(req.lang("media.errors.not_image"));
            }

            let image_path = media.image.path;
            let thumbnail_path = path.dirname(image_path) + "/" + size + "-" + path.basename(image_path);

            Storage.disk("uploads")
                .save(thumbnail_path, Buffer.from(data, 'base64'), 'binary', error => {
                    if (error) return res.serverError(error);

                    return res.message(req.lang("media.events.updated")).ok(id);
                });
        });
    }

    /**
     * Delete media by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        Media.findById(id,  (error, media) => {
            if (error) return res.serverError(error);
            if (!media) return res.notFound(req.lang("media.errors.media_not_found"));

            if (!req.can("media.delete", media)) {
                return res.forbidden(req.lang("media.errors.delete_denied", {
                    media: media.name
                }));
            }

            media.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("media.events.deleted")).ok(id);
            });
        });
    }

    /**
     * Bulk operations
     * @param req
     * @param res
     */
    bulk(req, res) {

        let operation = req.param("operation");
        let ids = req.param("ids");
        let data = req.param("data");

        ids = Array.isArray(ids) ? ids : ids.toArray(",");

        if (req.filled("data")) {
            data = typeof data === 'object' ? data : JSON.parse(data);
        }

        if (["update", "delete"].indexOf(operation) <= -1) {
            return res.serverError(req.lang("media.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, (id, callback) => {

                Media.findById(id,  (error, media) => {

                    if (error) return res.serverError(error);
                    if (!media) return res.notFound(req.lang("media.errors.media_not_found"));

                    if (operation === "delete") {

                        if (!req.can("media.delete", media)) {
                            return res.forbidden(req.lang("media.errors.delete_denied", {
                                media: media.name
                            }));
                        }

                        media.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    } else if (operation === "update") {

                        if (!req.can("media.update", media)) {
                            return res.forbidden(req.lang("media.errors.update_denied", {
                                media: media.id
                            }));
                        }

                        if ("title" in data) {
                            media.title = data.title || media.title;
                        }

                        if ("description" in data) {
                            media.description = data.description || media.description;
                        }

                        media.save(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });
                    }
                });

            },

            (error, result = []) => {

                if (operation === "update") {
                    return res.message(req.lang("media.events.updated")).ok(result);
                }

                if (operation === "delete") {
                    return res.message(req.lang("media.events.deleted")).ok(result);
                }
            }
        );

    }
};

