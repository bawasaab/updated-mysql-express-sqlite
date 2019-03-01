const _ = require('lodash');
const CommonCntrl = require('./common_controller');
const _RoleService = require('../services/role_service');
const RoleService = new _RoleService();
var config = {
    err_messages: {},
    expected_keys: [],
    not_null_keys: [],
    required_keys: []
};
let $this;

module.exports = class RoleController {
        
    constructor() {
        
        $this = this;
        config.err_messages = {
            'name': "First Name",
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
            'name'
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

            RoleService.insertRole( req, in_data, ( status, result ) => {
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
            RoleService.updateRole( req, in_data, id, ( status, result ) => {
                res.status(status).send(result);
            } );
        }
    }

    fetchAll(req, res, next) {
        
        let in_data = {};
        RoleService.fetchAllRoles( req, in_data, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    fetchById(req, res, next) {

        let id = req.params.id;
        let in_data = {};
        RoleService.fetchRolesById( req, in_data, id, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    softDelete(req, res, next) {

        let id = req.params.id;
        RoleService.softDeleteRole( req, id, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    hardDelete(req, res, next) {

        let id = req.params.id;
        RoleService.hardDeleteRole( req, id, ( status, result ) => {
            res.status(status).send(result);
        } );
    }
}