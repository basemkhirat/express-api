import Controller from "~/controllers/Controller";
import Meta from '~/models/meta';
import Post from '~/models/post';
import Event from '~/models/event';
import Category from '~/models/category';

export default class extends Controller {

    render(data) {

        let head = {};

        head.title = data.title;

        head.meta = [];

        for (let key in data.meta) {

            if (key == "og") {

                for (let og_key in data.meta.og) {
                    head.meta.push({
                        hid: key + ":" + og_key,
                        name: key + ":" + og_key,
                        property: key + ":" + og_key,
                        content: data.meta.og[og_key]
                    })
                }


            } else if (key == "twitter") {

                for (let twitter_key in data.meta.twitter) {
                    head.meta.push({
                        hid: key + ":" + twitter_key,
                        name: key + ":" + twitter_key,
                        content: data.meta.twitter[twitter_key]
                    })
                }

            } else {
                head.meta.push({
                    hid: key,
                    name: key,
                    content: data.meta[key]
                })
            }
        }

        return head;
    }

    async find(req, res) {

        try {

            let type = req.param("type");

            let data = await Meta.where("type", "default").findOne();

            data = data.toObject();

            if (type == "home") {

                // do something..

                return res.ok(this.render(data));

            }else if (type == "post") {

                let id = req.param("id");

                let post = await Post.findById(id)
                    .populate("tags")
                    .populate("media")
                    .exec();

                if (!post) {
                    return res.notFound();
                }

                data.type = "post";

                data.title = post.title;
                data.meta.title = post.title;
                data.meta.description = post.excerpt;
                data.meta.keywords = post.tags.map(tag => tag.name).join(", ");

                data.meta.og.type = "article";
                data.meta.og.title = post.title;
                data.meta.og.description = post.excerpt;

                if (post.media) {

                    data.meta.og.image = post.media.thumbnails.large;

                    if (post.media.type == 'video') {
                        data.meta.og.video = post.media.url;
                    }

                    if (post.media.type == 'audio') {
                        data.meta.og.audio = post.media.url;
                    }
                }

                data.meta.twitter.title = post.title;
                data.meta.twitter.description = post.excerpt;

                if (post.media) {
                    data.meta.twitter.image = post.media.thumbnails.large;
                }

                return res.ok(this.render(data));

            }else if (type == "event") {

                let id = req.param("id");

                let event = await Event.findById(id)
                    .populate("tags")
                    .populate("media")
                    .exec();

                if (!event) {
                    return res.notFound();
                }

                data.type = "event";

                data.title = event.title;
                data.meta.title = event.title;
                data.meta.description = event.excerpt;
                data.meta.keywords = event.tags.map(tag => tag.name).join(", ");

                data.meta.og.type = "article";
                data.meta.og.title = event.title;
                data.meta.og.description = event.excerpt;

                if (event.media) {

                    data.meta.og.image = event.media.thumbnails.large;

                    if (event.media.type == 'video') {
                        data.meta.og.video = event.media.url;
                    }

                    if (event.media.type == 'audio') {
                        data.meta.og.audio = event.media.url;
                    }
                }

                data.meta.twitter.title = event.title;
                data.meta.twitter.description = event.excerpt;

                if (event.media) {
                    data.meta.twitter.image = event.media.thumbnails.large;
                }

                return res.ok(this.render(data));

            }else if (type == "category") {

                let id = req.param("id");

                let category = await Category.findById(id)
                    .populate("image")
                    .exec();


                if (!category) {
                    return res.notFound();
                }

                data.type = "category";

                data.title = category.name;
                data.meta.title = category.name;
                data.meta.description = category.description;

                data.meta.og.type = "website";
                data.meta.og.title = category.name;
                ;
                data.meta.og.description = category.description;

                if (category.image) {
                    data.meta.og.image = category.image.thumbnails.large;
                }

                data.meta.twitter.title = category.name;
                data.meta.twitter.description = category.description;

                if (category.image) {
                    data.meta.twitter.image = category.image.thumbnails.large;
                }

                return res.ok(this.render(data));

            }else{
                return res.ok(this.render(data));
            }

        } catch (e) {
            return res.serverError(e);
        }
    }


};

