const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const htmlToText = require('html-to-text');
const utils = require('../../utils');

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);
mongoose.set('useCreateIndex', true);

const UserSchema = new Schema({
    displayName: String,
    email: String,
    phoneNumber: String,
    providerId: String,
    photoUrl: String,
    uid: String,
});

const PostSchema = new Schema({
    user: {
        type: UserSchema,
        required: true,
    },
    title: {
        type: String,
        default: '(제목없음)',
    },
    content: {
        type: String,
        default: '(제목없음)',
    },
    preview: {
        type: String,
        default: '(내용없음)',
    },
    category: {
        type: String,
        required: true,
        default: 'etc',
        enum: ['notice', 'post', 'etc'],
    },
    tags: [String],
    thumbnail: {
        type: String,
        default: '',
    },
    views: {
        type: Number,
        default: 0,
    },
    created: {
        type: Date,
        default: Date.now(),
    }
}, {
    timestamps: true,
});

// Create new todo document
PostSchema.statics.create = function (payload) {
    const thumbnail_matches = utils.matchesImage(payload.preview);
    let preview = htmlToText.fromString(payload.preview, {
        ignoreHref: true,
        ignoreImage: true,
    });
    if (preview && preview.length > 200) {
        preview = preview.substr(0, 200) + '...';
    }
    // this === Model
    const post = new this({ ...payload, preview, thumbnail: thumbnail_matches ? thumbnail_matches[1] : '' });
    // return Promise
    return post.save();
};
  
// Find All
PostSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
};
  
// Find One by todoid
PostSchema.statics.findOneById = function (id) {
    return this.findOne({ _id: id });
};
  
// Update by todoid
PostSchema.statics.updateById = function (id, payload) {
    const thumbnail_matches = utils.matchesImage(payload.preview);
    let preview = htmlToText.fromString(payload.preview, {
        ignoreHref: true,
        ignoreImage: true,
    });
    if (preview && preview.length > 200) {
        preview = preview.substr(0, 200) + '...';
    }
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ _id: id }, { ...payload, preview, thumbnail: thumbnail_matches ? thumbnail_matches[1] : '' }, { new: true });
};
  
// Delete by todoid
PostSchema.statics.deleteById = function (id) {
    return this.remove({ _id: id });
};

PostSchema.plugin(autoIncrement.plugin, 'Post');
const Model = mongoose.model('Post', PostSchema);

module.exports = Model;