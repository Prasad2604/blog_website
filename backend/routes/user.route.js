const express = require('express')
const router = express.Router();
const {getTest} = require('../controllers/user.controller')

router.route('/').get(getTest);

module.exports = router