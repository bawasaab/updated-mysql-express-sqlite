const _ = require('lodash');
const CommonCntrl = require('./common_controller');
const _CourseService = require('../services/course_service');
const CourseService = new _CourseService();

var config = {
    err_messages: {},
    expected_keys: [],
    not_null_keys: [],
    required_keys: []
};
let $this;

module.exports = class CourseController {
        
    constructor() {
        
        $this = this;
        config.err_messages = {
            "name": "Name",
            "description": "Description",
            "duration": "Duration",
            "durationType": "Duration Type",
            "status": "Status"
        };
        
        config.expected_keys = [
            "name",
            "description",
            "duration",
            "durationType",
            "status"
        ];
        
        config.not_null_keys = [
            "name",
            "description",
            "duration",
            "durationType",
            "status"
        ];
        
        config.required_keys = [
            "name",
            "description",
            "duration",
            "durationType",
            "status"
        ];
    }

    insert(req, res, next) {

        let obj = new CommonCntrl( config );
        let in_data = {};
        in_data = obj.check_inputs(req.body, true);
        
        if (in_data.err.length > 0) {
    
            res.status(400).send({ result: { err: in_data.err, input: req.body, output: {}, message: "Bad request!" } });
        } else if ((typeof in_data.err.err != "undefined") && (in_data.err.err.length > 0)) {
    
            res.status(400).send({ result: { err: in_data.err, input: req.body, output: {}, message: "Bad request!" } });
        } else {

            CourseService.insertCourse( req, in_data, ( status, result ) => {
                res.status(status).send(result);
            } );
        }
    }

    update(req, res, next) {

        let id = req.params.id;
        let obj = new CommonCntrl(  config );
        let in_data = {};
        in_data = obj.check_inputs(req.body, false);

        if (in_data.err.length) {
            res.status(400).send({ result: { err: in_data.err, input: req.body, output: {}, message: "Bad request!" } });
        } else if ( _.isEmpty( in_data.data ) ) {
            res.status(400).send({ result: { err: in_data.err, input: req.body, output: {}, message: "Bad request!" } });                   
        } else {
            CourseService.updateCourse( req, in_data, id, ( status, result ) => {
                res.status(status).send(result);
            } );
        }
    }

    fetchAll(req, res, next) {
        
        let in_data = {};
        CourseService.fetchAllCourses( req, in_data, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    fetchById(req, res, next) {

        let id = req.params.id;
        let in_data = {};
        CourseService.fetchCoursesById( req, in_data, id, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    softDelete(req, res, next) {

        let id = req.params.id;
        CourseService.softDeleteCourse( req, id, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    hardDelete(req, res, next) {

        let id = req.params.id;
        CourseService.hardDeleteCourse( req, id, ( status, result ) => {
            res.status(status).send(result);
        } );
    }
}