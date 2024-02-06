const express = require('express')
const router = express.Router()
const {create, getposts} = require('../controllers/post.controller')
const verifyToken = require('../middlewares/verifyUser')

router.post('/create',verifyToken,create)
router.route('/getposts').get(getposts)

module.exports = router