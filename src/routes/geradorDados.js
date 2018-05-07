const express = require('express');
const router = express.Router();
const controller = require('../controllers/geradorDadosController')

router.get('/', controller.get);

module.exports = router;