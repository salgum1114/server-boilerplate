const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const htmlToText = require('html-to-text');

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);
mongoose.set('useCreateIndex', true);

const PostSchema = new Schema({
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
    },
    tags: {
        type: [String],
    },
    thumbnail: {
        type: String,
        default: '',
    },
    like: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});

// Create new todo document
PostSchema.statics.create = function (payload) {
    const thumbnail_matches = payload.preview.match(`<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>`);
    const preview = htmlToText.fromString(payload.preview, {
        ignoreHref: true,
        ignoreImage: true,
    }).substr(0, 200) + '...';
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
    const thumbnail_matches = payload.preview.match(`<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>`);
    const preview = htmlToText.fromString(payload.preview, {
        ignoreHref: true,
        ignoreImage: true,
    }).substr(0, 200) + '...';
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