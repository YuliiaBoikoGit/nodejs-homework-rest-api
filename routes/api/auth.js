const express = require("express");
const router = express.Router();

const { controllerWrapper } = require("../../helpers");
const controller = require('../../controllers/auth');
const { authenticate } = require('../../middlewares');

router.post('/signup', controllerWrapper(controller.signup));

router.post('/login', controllerWrapper(controller.login));

router.get('/current', authenticate, controllerWrapper(controller.getCurrent));

router.get('/logout', authenticate, controllerWrapper(controller.logout));

router.patch('/', authenticate, controllerWrapper(controller.updateSubscription));

module.exports = router;