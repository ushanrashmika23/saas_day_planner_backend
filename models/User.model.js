const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    accessToken: {
        type: String,
        select: false
    },
    otp: {
        type: String,
        select: false
    },
    avatar: {
        type: String
    },
    role: {
        type: String,
        enum: ['user', 'pro', 'admin'],
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

// Virtual for id to match the interface
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});

module.exports = mongoose.model('User', userSchema);
