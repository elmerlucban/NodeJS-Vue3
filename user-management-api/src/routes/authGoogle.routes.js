require('express-router-group');
const express = require('express');
const authController = require('../controllers/authGoogleController');

const router = express.Router();

router.group("/api/v1/google", (router) => {
    router.get('/',         authController.authenticateGoogle)
    router.get('/callback', authController.googleCallback)
    router.get('/logout',   authController.logout)
});

module.exports = router;
