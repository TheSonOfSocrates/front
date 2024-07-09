const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const authController = require('../../controllers/AuthController');
const userController = require('../../controllers/UserController');
const auth = require('../../controllers/AuthController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extension);
  },
});

const upload = multer({ storage: storage });

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/change-password', auth.isAuthorized, authController.changePassword);
router.post('/check-password', auth.isAuthorized, authController.checkPassword);
router.post('/check-token', authController.checkToken);
router.post('/verify', authController.verifyEmail);

router.get('/getAllUsers', userController.getAllUsers);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);

router.post('/email', userController.sendEmail);

router.post('/send-notifications', auth.isAuthorized, userController.sendNotifications);
router.get('/get-notifications', auth.isAuthorized, userController.getNotifications);
router.post('/delete-notifications', auth.isAuthorized, userController.deleteNotifications);
router.post('/view-notification', auth.isAuthorized, userController.viewNotification);
router.post('/view-all-notification', auth.isAuthorized, userController.viewAllNotification);

router.post('/applyJob', upload.fields([{ name: 'resume' }, { name: 'passport' }]), userController.applyJob);
router.post('/applyJob2', upload.fields([{ name: 'resume' }, { name: 'passport' }, { name: 'selfie' }, { name: 'video' }]), userController.applyJob2);

module.exports = router;
