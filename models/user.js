// Begin Date: 2020/05/21   Thu
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
    {
        name: {
            type:       String,
            required:   true
        },
        email: {
            type:       String,
            required:   true
        },
        password: {
            type:       String,
            required:   true
        },
        postCount: {
            type:       Number,
            default:    0
        },
        commentCount: {
            type:       Number,
            default:    0
        },
        signed_count: {
            type:       Number,
            default:    1
        },
        last_signed_at: {
            type:       Date,
            default:    Date.now
        }
    },
    {
        timestamps:     true
    }
);

UserSchema.pre('save', function (next) {
    const user = this;
    const SALT_FACTOR = 10;

    if (!user.isModified('password')) // isModified ???
        return next();

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err)
            return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err)
                return next(err);
    
            user.password = hash;
            next();
        });
    });
});

module.exports = User = mongoose.model('users', UserSchema);