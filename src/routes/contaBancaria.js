const express = require('express');
const router = express.Router();
const controller = require('../controllers/contaBancariaController')

router.get('/', controller.get);

module.exports = router;