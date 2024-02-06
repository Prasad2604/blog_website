const express = require('express')
const router = express.Router()
const {create, getposts, deletepost, updatepost} = require('../controllers/post.controller')
const verifyToken = require('../middlewares/verifyUser')

router.post('/create',verifyToken,create)
router.route('/getposts').get(getposts)
router.delete('/deletepost/:postId/:userId',verifyToken,deletepost)
router.put('/updatepost/:postId/:userId',verifyToken,updatepost)

module.exports = router