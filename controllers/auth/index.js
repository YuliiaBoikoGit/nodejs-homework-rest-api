const signup = require('./signup');
const verify = require('./verify');
const resendVerify = require('./resendVerify');
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');

module.exports = {
    signup,
    verify,
    resendVerify,
    login,
    getCurrent,
    logout,
    updateSubscription,
    updateAvatar,
};