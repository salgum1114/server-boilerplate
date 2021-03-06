import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import htmlToText from 'html-to-text';
import difference from 'lodash/difference';
import isEqaul from 'lodash/isEqual';

import utils from '../../utils';
import User from './user';

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);
mongoose.set('useCreateIndex', true);

const PostSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true,
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
        type: Number,
        default: () => new Date().valueOf(),
    },
    updated: {
        type: Number,
        deafult: () => new Date().valueOf(),
    },
});

// Create new todo document
PostSchema.statics.create = async function (payload) {
    try {
        const user = await User.findOneByEmail(payload.email);
        if (!user) {
            throw new Error('Not found user');
        }
        const thumbnail_matches = utils.matchesImage(payload.preview);
        let preview = htmlToText.fromString(payload.preview, {
            ignoreHref: true,
            ignoreImage: true,
        });
        if (preview && preview.length > 200) {
            preview = preview.substr(0, 200) + '...';
        }
        // this === Model
        const post = new this({
            ...payload,
            preview,
            thumbnail: thumbnail_matches ? thumbnail_matches[1] : '',
            user: user._id,
        });
        // return Promise
        return post.save();
    } catch (error) {
        throw error;
    }
};
  
// Find All
PostSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
};

PostSchema.statics.findByUser = async function (email) {
    const user = await User.findOneByEmail(email);
    if (!user) {
        throw new Error('Not found user');
    }
    return this.find()
        .where('user').equals(user._id);
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

PostSchema.statics.findTagsByUser = async function (email) {
    const user = await User.findOneByEmail(email);
    if (!user) {
        throw new Error('Not found user');
    }
    try {
        const values = await this.find()
            .where('user').equals(user._id)
            .select('tags');
        return values.reduce((prev, value) => {
            const diff = difference(value.tags, prev);
            return prev.concat(diff);
        }, []);
    } catch (error) {
        throw error;
    }
}
  
// Delete by todoid
PostSchema.statics.deleteById = function (id) {
    return this.remove({ _id: id });
};

PostSchema.pre('find', function () {
    this.populate('user');
});

PostSchema.pre('findOne', function () {
    this.populate('user');
});

PostSchema.plugin(autoIncrement.plugin, 'Post');
const Model = mongoose.model('Post', PostSchema);

export default Model;