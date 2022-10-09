const express = require('express');
const router = express.Router();

const controller = require("../../controllers/contacts");
const { controllerWrapper } = require("../../helpers");
const { isValidId, authenticate } = require("../../middlewares");

router.get('/', authenticate, controllerWrapper(controller.getAllContacts));

router.get('/:contactId', authenticate, isValidId, controllerWrapper(controller.getContactById));

router.post('/', authenticate, controllerWrapper(controller.addContact));

router.delete('/:contactId', authenticate, isValidId, controllerWrapper(controller.removeContact));

router.put('/:contactId', authenticate, isValidId, controllerWrapper(controller.updateContact));

router.patch('/:contactId/favorite', authenticate, isValidId, controllerWrapper(controller.updateStatusContact));

module.exports = router;