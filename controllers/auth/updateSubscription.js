const { User } = require('../../models/user');
const { RequestError } = require("../../helpers");
const { schemas } = require('../../models/user');

const updateSubscription = async (req, res) => {
    const { error } = schemas.updateSubscriptionSchema.validate(req.body);
    if (error) {
        throw RequestError(400, "missing field subscription");
    };

    const { _id } = req.user;
    const data = await User.findByIdAndUpdate(_id, req.body, { new: true });

    res.json(data);
};

module.exports = updateSubscription;