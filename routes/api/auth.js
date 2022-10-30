const express = require("express");
const router = express.Router();

const { controllerWrapper } = require("../../helpers");
const controller = require('../../controllers/auth');
const { authenticate, upload } = require('../../middlewares');

router.post('/signup', controllerWrapper(controller.signup));

router.get('/verify/:verificationToken', controllerWrapper(controller.verify));

router.post('/verify', controllerWrapper(controller.resendVerify));

router.post('/login', controllerWrapper(controller.login));

router.get('/current', authenticate, controllerWrapper(controller.getCurrent));

router.get('/logout', authenticate, controllerWrapper(controller.logout));

router.patch('/', authenticate, controllerWrapper(controller.updateSubscription));

router.patch('/avatars', authenticate, upload.single("avatar"), controllerWrapper(controller.updateAvatar));

module.exports = router;