const _ = require('lodash');
const CommonCntrl = require('./common_controller');
const _CourseLevelService = require('../services/course_levels_service');
const CourseLevelService = new _CourseLevelService();
var config = {
    err_messages: {},
    expected_keys: [],
    not_null_keys: [],
    required_keys: []
};
let $this;

module.exports = class CourseLevelController {

    constructor() {
        
        $this = this;
        config.err_messages = {
            'name': "Name",
            'status': "Status"
        };
        
        config.expected_keys = [
            'name',
            'status'
        ];
        
        config.not_null_keys = [
            'name'
        ];
        
        config.required_keys = [
            'name',
            'status'
        ];

        config.enums = {
            'status': ['OPEN', 'CLOSE']
        };

        config.allowed_filters = [
            'id',
            'name',
            'status'
        ];
    }

    insert( req, res ) {

        let obj = new CommonCntrl( config );
        let in_data = {};
        in_data = obj.check_inputs(req.body, true);
        
        if (in_data.err.length > 0) {
    
            res.status(400).send({ result: { err: in_data.err, input: req.body, output: {}, message: "Bad request!" } });
        } else if ((typeof in_data.err.err != "undefined") && (in_data.err.err.length > 0)) {
    
            res.status(400).send({ result: { err: in_data.err, input: req.body, output: {}, message: "Bad request!" } });
        } else {
            if( in_data.data.name !== undefined ) {
                in_data.data.name = in_data.data.name.toUpperCase();
            }
            CourseLevelService.insert( req, in_data, ( status, result ) => {
                res.status(status).send(result);
            } );
        }
    }

    update( req, res ) {

        let id = req.params.id;
        let obj = new CommonCntrl(  config );
        let in_data = {};
        in_data = obj.check_inputs(req.body, false);

        if (in_data.err.length) {
            res.status(400).send({ result: { err: in_data.err, input: req.body, output: {}, message: "Bad request!" } });
        } else if ( _.isEmpty( in_data.data ) ) {
            res.status(400).send({ result: { err: in_data.err, input: req.body, output: {}, message: "Bad request!" } });                   
        } else {
            in_data.data.name = in_data.data.name.toUpperCase();
            CourseLevelService.update( req, in_data, id, ( status, result ) => {
                res.status(status).send(result);
            } );
        }
    }

    fetchByCustomFilters( req, res ) {
        
        let condition = {};
        let flag = false;

        if( _.isEmpty( req.query ) && _.isEmpty( req.params ) && _.isEmpty( req.body ) ) {
            flag = true;
            condition = { status: { ne: 'DELETED' } };
        } else {
            let obj = new CommonCntrl( config );
            let reqFilters = {};

            if( !(_.isEmpty(req.query)) ) {
                reqFilters = req.query;
            } else if( !(_.isEmpty(req.params)) ) {
                reqFilters = req.params;
            } else if( !(_.isEmpty(req.body)) ) {
                reqFilters = req.body;
            } 

            let in_data = obj.check_allowed_filters(reqFilters);
            if (in_data.err.length > 0) {
                res.status(400).send({ result: { err: in_data.err, input: req.query, output: {}, message: "Bad request!" } });
            } else if ((typeof in_data.err.err != "undefined") && (in_data.err.err.length > 0)) {
                res.status(400).send({ result: { err: in_data.err, input: req.query, output: {}, message: "Bad request!" } });
            } else {
                flag = true;
                condition = reqFilters;
            }
        }
        if( flag ) {
            CourseLevelService.fetchByCustomFilters( req, condition, ( status, result ) => {
                res.status(status).send(result);
            } );
        }
    }

    fetchAll( req, res ) {
        CourseLevelService.fetchAll( req, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    fetchAllOpened( req, res ) {
        CourseLevelService.fetchAllOpened( req, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    fetchAllClosed( req, res ) {
        CourseLevelService.fetchAllClosed( req, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    fetchById( req, res ) {

        let id = req.params.id;
        let in_data = {};
        CourseLevelService.fetchById( req, in_data, id, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    softDelete( req, res ) {

        let id = req.params.id;
        CourseLevelService.softDelete( req, id, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    hardDelete( req, res ) {

        let id = req.params.id;
        CourseLevelService.hardDelete( req, id, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    hardUpdate( req, res ) {

        let id = req.params.id;
        let obj = new CommonCntrl(  config );
        let in_data = {};
        in_data = obj.check_inputs(req.body, false);

        if (in_data.err.length) {
            res.status(400).send({ result: { err: in_data.err, input: req.body, output: {}, message: "Bad request!" } });
        } else if ( _.isEmpty( in_data.data ) ) {
            res.status(400).send({ result: { err: in_data.err, input: req.body, output: {}, message: "Bad request!" } });                   
        } else {
            in_data.data.name = in_data.data.name.toUpperCase();
            CourseLevelService.hardUpdate( req, in_data, id, ( status, result ) => {
                res.status(status).send(result);
            } );
        }
    }
}