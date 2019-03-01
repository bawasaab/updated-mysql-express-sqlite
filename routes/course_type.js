const express = require('express');
const router = express.Router();

const _AuthController = require('../controllers/auth_controller');
const _CourseTypeController = require('../controllers/course_type_controller');
const AuthController = new _AuthController();
const CourseTypeController = new _CourseTypeController();

router.get('/all', [
    // AuthController.verifyToken,
    // AuthController.verifyAccess,
    CourseTypeController.fetchAll
]);

router.get('/opened', [
    // AuthController.verifyToken,
    // AuthController.verifyAccess,
    CourseTypeController.fetchAllOpened
]);

router.get('/closed', [
    // AuthController.verifyToken,
    // AuthController.verifyAccess,
    CourseTypeController.fetchAllClosed
]);

router.get('/', [
    // AuthController.verifyToken,
    // AuthController.verifyAccess,
    CourseTypeController.fetchByCustomFilters
]);

router.get('/:id', [
    // AuthController.verifyToken,
    // AuthController.verifyAccess,
    CourseTypeController.fetchById
]);

router.post('/', [
    // AuthController.verifyToken,
    // AuthController.verifyAccess,
    CourseTypeController.insert
]);

router.put('/:id', [
    // AuthController.verifyToken,
    // AuthController.verifyAccess,
    CourseTypeController.update
]);

router.delete("/:id", [
    // AuthController.verifyToken,
    // AuthController.verifyAccess,
    CourseTypeController.softDelete
]);

router.delete('/hard-delete/:id', [
    // AuthController.verifyToken,
    // AuthController.verifyAccess,
    CourseTypeController.hardDelete
]);

router.put('/hard-update/:id', [
    // AuthController.verifyToken,
    // AuthController.verifyAccess,
    CourseTypeController.hardUpdate
]);

module.exports = router;