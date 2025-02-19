const { Contact } = require("../../models/contact");
const { RequestError } = require("../../helpers");
const { schemas } = require("../../models/contact");

const updateContact = async (req, res) => {
    const { error } = schemas.addSchema.validate(req.body);

    if (error) {
        throw RequestError(400, "missing fields" );
    };

    const { contactId } = req.params;
    const data = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});

    if (!data) {
        throw RequestError(404, "Not found");
    };

    res.json(data);
};

module.exports = updateContact;