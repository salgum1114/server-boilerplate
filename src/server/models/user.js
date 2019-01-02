const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose.connection);
mongoose.set('useCreateIndex', true);

const UserSchema = new Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, 'Invalid email'],
        unique: true,
        index: true,
    },
    username: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: String,
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['admin', 'user'],
    },
    created: {
        type: Date,
        default: Date.now(),
    },
}, {
    timestamps: true,
});

const SALT_WORK_FACTOR = 10;

UserSchema.pre('save', function (next) {
    let user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    })
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// Create new todo document
UserSchema.statics.create = function (payload) {
    // this === Model
    const post = new this(payload);
    // return Promise
    return post.save();
};
  
// Find All
UserSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
};
  
// Find One by todoid
UserSchema.statics.findOneById = function (userId) {
    return this.findOne({ userId });
};
  
// Update by todoid
UserSchema.statics.updateById = function (userId, payload) {
    // { new: true }: return the modified document rather than the original. defaults to false
    return this.findOneAndUpdate({ userId }, payload, { new: true });
};
  
// Delete by todoid
UserSchema.statics.deleteById = function (userId) {
    return this.remove({ userId });
};

UserSchema.statics.getAuthenticated = function (userId, password, cb) {
    this.findOne({ userId }, function (err, user) {
        if (err) {
            return cb(err);
        }
        if (!user) {
            return cb(null, null, 0);
        }
        user.comparePassword(password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            if (isMatch) {
                return cb(null, user);
            }
        });
    });
};

UserSchema.plugin(autoIncrement.plugin, 'User');
UserSchema.plugin(uniqueValidator);
const Model = mongoose.model('User', UserSchema);

module.exports = Model;