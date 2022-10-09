const { Contact } = require("../../models/contact");
const { schemas } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const addContact = async (req, res) => {
    const { error } = schemas.addSchema.validate(req.body);

    if (error) {
        throw RequestError(400, error.message);
    };

    const { _id: owner } = req.user;
    const data = await Contact.create({ ...req.body, owner });
    res.status(201).json(data);
};

module.exports = addContact;