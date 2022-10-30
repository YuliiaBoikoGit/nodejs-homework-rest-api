const sgEmail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgEmail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const mail = { ...data, from: "yuliyapboyko@gmail.com" };
    await sgEmail.send(mail);
    return true;
};

module.exports = sendEmail;