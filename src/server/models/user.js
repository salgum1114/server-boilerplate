import mongoose from 'mongoose';
import { isEmail } from 'validator';
import uniqueValidator from 'mongoose-unique-validator';

const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'Invalid email'],
        unique: true,
        index: true,
    },
    displayName: {
        type: String,
    },
    bio: String,
    photoURL: String,
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['admin', 'user'],
    },
    uid: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    created: {
        type: Date,
        default: new Date().valueOf(),
    },
    updated: {
        type: Date,
        deafult: new Date().valueOf(),
    },
});

// Create new todo document
UserSchema.statics.create = function (payload) {
    // this === Model
    const user = new this(payload);
    // return Promise
    return user.save();
};
  
// Find All
UserSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
};
  
// Find One by todoid
UserSchema.statics.findOneByEmail = function (email) {
    return this.findOne({ email });
};
  
// Update by todoid
UserSchema.statics.updateByEmail = function (email, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ email }, payload, { new: true });
};
  
// Delete by todoid
UserSchema.statics.deleteByEmail = function (email) {
    return this.remove({ email });
};

UserSchema.plugin(uniqueValidator);
const Model = mongoose.model('User', UserSchema);

export default Model;