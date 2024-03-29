const express = require('express')
const router = express.Router();
const {getTest, updateUser, deleteUser, signout, getUsers} = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyUser');

router.route('/').get(getTest);
router.put('/update/:userId',verifyToken,updateUser)
router.delete('/delete/:userId',verifyToken,deleteUser)
router.route('/signout').post(signout)
router.get('/getusers',verifyToken,getUsers)

module.exports = router