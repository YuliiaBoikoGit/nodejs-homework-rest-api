const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { User, schemas } = require('../../models/user');
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");

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
    const verificationToken = nanoid();
    const newUser = await User.create({ email, password: hashPassword, avatarURL, verificationToken });
    const mail = createVerifyEmail(email, verificationToken);

    await sendEmail(mail);

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
            verificationToken: newUser.verificationToken,
        },
    });
};

module.exports = signup;