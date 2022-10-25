const { Schema, model } = require('mongoose');
const Joi = require("joi");

const { handleSaveErrors } = require('../helpers');

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleSaveErrors);

const signupSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

const updateSubscriptionSchema = Joi.object().keys({
    subscription: Joi.string().valid('starter', 'pro', 'business').required(),
});

const verifyEmailSchema = Joi.object({
    email: Joi.string().required().label("missing required field email"),
});

const schemas = {
    signupSchema,
    updateSubscriptionSchema,
    verifyEmailSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
};