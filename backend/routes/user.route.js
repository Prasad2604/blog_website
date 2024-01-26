const express = require('express')
const router = express.Router();
const {getTest, updateUser} = require('../controllers/user.controller');
const verifyToken = require('../middlewares/verifyUser');

router.route('/').get(getTest);
router.put('/update/:userId',verifyToken,updateUser)

module.exports = router