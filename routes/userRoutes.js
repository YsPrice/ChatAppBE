const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authRequired } = require('../utils/jwtUtils');
const { upload }  = require('../utils/imageUploadUtils');

router.post('/', userController.createUser);
router.post('/login', userController.userLogin);
router.post('/upload', authRequired, upload.single('profileImage'), userController.addProfileImage)
router.delete('/', authRequired, userController.deleteUser);


module.exports = router;