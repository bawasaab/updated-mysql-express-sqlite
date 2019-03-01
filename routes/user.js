const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth_controller');
const UserController = require('../controllers/user_controller');
const authCntrl = new AuthController();
const UserCtrl = new UserController();

router.get('/', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    UserCtrl.fetchAll
]);

router.get('/:id', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    UserCtrl.fetchById
]);

router.post('/', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    UserCtrl.insert
]);

router.put('/:id', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    UserCtrl.update
]);

router.delete("/:id", [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    UserCtrl.softDelete
]);

router.delete('/hard-delete/:id', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    UserCtrl.hardDelete
]);

module.exports = router;