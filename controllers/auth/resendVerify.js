const { User, schemas } = require('../../models/user');
const { RequestError, createVerifyEmail, sendEmail } = require("../../helpers");

const resendVerify = async (req, res) => {
    const { error } = schemas.verifyEmailSchema.validate(req.body);
    if (error) {
        throw RequestError(400, error.message);
    };

    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw RequestError(400, "Email not found");
    };

    if (user.verify) {
        throw RequestError(400, "Verification has already been passed");
    };

    const mail = createVerifyEmail(email, user.verificationToken);
    await sendEmail(mail);

    res.json({
        message: "Verification email sent",
    });
};

module.exports = resendVerify;