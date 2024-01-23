const express = require('express')
const router = express.Router();
const {getTest} = require('../controllers/user.controller')
const {signup, signin,google} = require('../controllers/auth.controller')

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/google').post(google)

module.exports = router