const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const rolesRouter = require('./role');
const usersRouter = require('./user');
const courseTypesRouter = require('./course_type');
const coursesRouter = require('./course');

router.use('/auth', authRouter);
router.use('/roles', rolesRouter);
router.use('/users', usersRouter);
router.use('/courseTypes', courseTypesRouter);
router.use('/courses', coursesRouter);

module.exports = router;
