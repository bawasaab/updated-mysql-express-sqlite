const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth_controller');
const RoleController = require('../controllers/role_controller');
const authCntrl = new AuthController();
const RoleCtrl = new RoleController();

router.get('/', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    RoleCtrl.fetchAll
]);

router.get('/:id', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    RoleCtrl.fetchById
]);

router.post('/', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    RoleCtrl.insert
]);

router.put('/:id', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    RoleCtrl.update
]);

router.delete("/:id", [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    RoleCtrl.softDelete
]);

router.delete('/hard-delete/:id', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    RoleCtrl.hardDelete
]);

module.exports = router;