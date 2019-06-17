import Controller from "~/controllers/Controller";
import Post from '~/models/post';
import async from "async";

export default class extends Controller {

    /**
     * Find all categories
     * @param req
     * @param res
     */
    find(req, res) {

        if (!req.can("post.view")) return res.forbidden();

        let query = Post.find();

        if (req.filled("user")) {
            query.where("user", req.param("user"));
        }

        if (req.filled("status")) {
            query.where("status", req.param("status"));
        }

        if (req.filled("q")) {
            query.where({$text: {$search: req.param("q")}});
        }

        query.page(req.param("page"), req.param("limit"));

        query.order(req.param("sort_field", "created_at"), req.param("sort_type", "desc"));

        query.populate("user").populate("media");

        query.execWithCount((error, result) => {
            if (error) return res.serverError(error);
            return res.ok({
                total: result.total,
                docs: res.attachPolicies(result.docs, "post")
            });
        });
    }

    /**
     * Find one post
     * @param req
     * @param res
     */
    findOne(req, res) {

        if (!req.can("post.view")) return res.forbidden();

        let id = req.param("id");

        Post.findById(id).populate("user").populate("media").exec(function (error, post) {

            if (error) return res.serverError(error);
            if (!post) return res.notFound(req.lang("post.errors.post_not_found"));

            post.getContent((error, content) => {
                if (error) return res.serverError(error);
                post.content = content;
                return res.ok(res.attachPolicies(post, "post"));
            });
        });
    }

    /**
     * Create a new post
     * @param req
     * @param res
     * @returns {*}
     */
    create(req, res) {

        if (!req.can("post.create")) return res.forbidden();

        let post = new Post();

        post.title = req.param("title", post.title);
        post.slug = req.param("slug", post.slug);
        post.excerpt = req.param("excerpt", post.excerpt);
        post.content = req.param("content", post.content);
        post.media = req.param("media", post.media);
        post.user = req.user.id;
        post.lang = req.param("lang", post.lang);
        post.status = req.param("status", post.status);
        post.published_at = req.param("published_at", post.published_at);

        post.save(function (error, post) {
            if (error) return res.serverError(error);
            return res.message(req.lang("post.events.created")).ok(post.id);
        });
    }

    /**
     * Update post by id
     * @param req
     * @param res
     */
    update(req, res) {

        let id = req.param("id");

        Post.findById(id, function (error, post) {
            if (error) return res.serverError(error);
            if (!post) return res.notFound(req.lang("post.errors.post_not_found"));

            if (!req.can("post.update", post)) {
                return res.forbidden(req.lang("post.errors.update_denied", {post: post.title}));
            }

            post.title = req.param("title", post.title);
            post.slug = req.param("slug", post.slug);
            post.excerpt = req.param("excerpt", post.excerpt);
            post.content = req.param("content", post.content);
            post.media = req.param("media", post.media);
            post.status = req.param("status", post.status);
            post.lang = req.param("lang", post.lang);
            post.published_at = req.param("published_at", post.published_at);

            post.save(error => {
                if (error) return res.serverError(error);
                return res.message(req.lang("post.events.updated")).ok(id);
            });
        });
    }

    /**
     * Delete post by id
     * @param req
     * @param res
     */
    destroy(req, res) {

        let id = req.param("id");

        Post.findById(id, function (error, post) {
            if (error) return res.serverError(error);
            if (!post) return res.notFound(req.lang("post.errors.post_not_found"));

            if (!req.can("post.delete", post)) {
                return res.forbidden(req.lang("post.errors.delete_denied", {post: post.title}));
            }

            post.remove(error => {
                if (error) res.serverError(error);
                return res.message(req.lang("post.events.deleted")).ok(id);
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

        if (["delete", "update"].indexOf(operation) <= -1) {
            return res.serverError(req.lang("post.errors.operation_not_allowed"));
        }

        async.mapSeries(ids, function (id, callback) {

                Post.findById(id, function (error, post) {

                    if (error) return res.serverError(error);
                    if (!post) return res.notFound(req.lang("post.errors.post_not_found"));

                    if (operation === "delete") {

                        if (!req.can("post.delete", post)) {
                            return res.forbidden(req.lang("post.errors.delete_denied", {
                                post: post.title
                            }));
                        }

                        post.remove(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });

                    } else if (operation === "update") {

                        if ("status" in data) {

                            if (!req.can("post.status", post)) {
                                return res.forbidden(req.lang("post.errors.status_denied", {
                                    post: post.title
                                }));
                            }

                            post.status = data.status || post.status;
                        }

                        post.save(error => {
                            if (error) return res.serverError(error);
                            return callback(null, id);
                        });
                    }
                });

            },

            function (error, result = []) {

                if (operation === "update") {
                    return res.message(req.lang("post.events.updated")).ok(result);
                }

                if (operation === "delete") {
                    return res.message(req.lang("post.events.deleted")).ok(result);
                }
            }
        );

    }
};

