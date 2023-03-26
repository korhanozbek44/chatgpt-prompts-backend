const express = require('express');
const validate = require('../../middlewares/validate');
const promptValidation = require('../../validations/prompt.validation');
const promptsController = require('../../controllers/prompts.controller');

const router = express.Router();

router.route('/get').get(validate(promptValidation.getAll), promptsController.getAll);

router.route('/get/:promptId').get(validate(promptValidation.getOne), promptsController.getOne);
router.route('/search').get(validate(promptValidation.search), promptsController.search);

module.exports = router;
