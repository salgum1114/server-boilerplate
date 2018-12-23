const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    id: {
        type: String,
        auto: true,
    },
    title: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

// Create new todo document
PostSchema.statics.create = function (payload) {
    // this === Model
    const post = new this(payload);
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
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ _id: id }, payload, { new: true });
};
  
// Delete by todoid
PostSchema.statics.deleteById = function (id) {
    return this.remove({ _id: id });
};

const Model = mongoose.model('Post', PostSchema);

module.exports = Model;