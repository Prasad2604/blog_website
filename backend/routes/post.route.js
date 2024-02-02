const express = require('express')
const router = express.Router()
const {create} = require('../controllers/post.controller')
const verifyToken = require('../middlewares/verifyUser')

router.post('/create',verifyToken,create)

module.exports = router