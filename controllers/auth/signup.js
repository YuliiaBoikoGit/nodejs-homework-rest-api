const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { User, schemas } = require('../../models/user');
const { RequestError } = require("../../helpers");

const signup = async (req, res) => {
    const { error } = schemas.signupSchema.validate(req.body);

    if (error) {
        throw RequestError(400, error.message);
    };

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw RequestError(409, "Email in use");
    };

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const newUser = await User.create({ email, password: hashPassword, avatarURL });
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

module.exports = signup;