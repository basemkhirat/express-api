import moment from 'moment';
import {Model, Schema} from 'dotapp/model';
import Media from './media';
import Tag from './tag';
import async from 'async';
import slug from '~/models/plugins/slug';

let schema = Schema({

    title: {
        type: String
    },

    excerpt: {
        type: String
    },

    content: {
        type: Array,
        set: function (content) {

            if (Array.isArray(content)) {
                return content;
            }

            return JSON.parse("[" + content + "]");
        }
    },

    lang: {
        type: String
    },

    media: {
        type: Schema.Types.ObjectId,
        ref: 'media'
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },

    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag'
    }],

    status: {
        type: Number,
        default: 0
    }

}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

schema.index({lang: 1});
schema.index({status: 1});
schema.index({media: 1});
schema.index({user: 1});
schema.index({tags: 1});
schema.index({created_at: -1});
schema.index({updated_at: -1});
schema.index({published_at: -1});
schema.index({
    title: 'text',
    slug: 'text',
    excerpt: 'text'
});
schema.plugin(slug({name: "slug", source: "title"}));

schema.methods.getContent = function (next) {

    async.mapSeries(this.content, function (row, callback) {

        if (typeof row != "object") {
            return callback(null, null);
        }

        if (row.type === "image") {

            Media.findById(row.image).exec((error, media) => {
                if (error || !media) return callback(null, null);

                row.image = media;
                callback(null, row);
            });

        } else if (row.type === "video") {

            Media.findById(row.video).exec((error, media) => {
                if (error || !media) return callback(null, null);

                row.video = media;
                callback(null, row);
            });

        } else if (row.type === "gallery") {

            Media.where({_id: {$in: row.gallery}}).exec(function (error, media) {
                if (error || media.length === 0) return callback(null, null);

                row.gallery = media;
                callback(null, row);
            });

        } else {
            callback(null, row);
        }

    }, function (error, content) {
        if (error) return next(error);
        next(null, content.filter(type => type !== null));
    });

};

schema.virtual("published").get(function () {
    return moment(this.published_at).fromNow();
});

schema.pre("save", function (next) {

    if (this.tag_names !== undefined) {

        Tag.saveNames(this.tag_names, (error, tags) => {
            if (error) return next(error);

            this.tags = tags;

            next(null, this);
        });

    }else{
        next(null, this);
    }
});

export default Model("page", schema, "page");
