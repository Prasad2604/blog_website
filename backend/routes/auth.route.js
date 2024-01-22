const express = require('express')
const router = express.Router();
const {getTest} = require('../controllers/user.controller')
const {signup} = require('../controllers/auth.controller')

router.route('/signup').post(signup)

module.exports = router