const express = require('express');
const AuthController = require('../controllers/auth_controller');
const authCtrl = new AuthController();
const router = express.Router();

router.post('/signin', [
  authCtrl.signin
]);

module.exports = router;
