const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, ...query } = req.query;
    const skip = (page - 1) * limit;

    const data = await Contact.find({ owner, ...query }, "-createdAt -updatedAt", { skip, limit })
                                .populate("owner", "email subscription")
    res.json(data);
};

module.exports = getAllContacts;