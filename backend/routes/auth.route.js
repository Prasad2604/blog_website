const express = require('express')
const router = express.Router();
const {getTest} = require('../controllers/user.controller')
const {signup, signin} = require('../controllers/auth.controller')

router.route('/signup').post(signup)
router.route('/signin').post(signin)

module.exports = router