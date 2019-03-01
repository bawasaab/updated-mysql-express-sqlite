const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth_controller');
const CourseController = require('../controllers/course_controller');
const authCntrl = new AuthController();
const CourseCtrl = new CourseController();

router.get('/', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    CourseCtrl.fetchAll
]);

router.get('/:id', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    CourseCtrl.fetchById
]);

router.post('/', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    CourseCtrl.insert
]);

router.put('/:id', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    CourseCtrl.update
]);

router.delete("/:id", [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    CourseCtrl.softDelete
]);

router.delete('/hard-delete/:id', [
    authCntrl.verifyToken,
    authCntrl.verifyAccess,
    CourseCtrl.hardDelete
]);

module.exports = router;