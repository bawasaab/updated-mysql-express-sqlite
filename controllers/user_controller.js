const _ = require('lodash');
const md5 = require('md5');
const CommonCntrl = require('./common_controller');
const _UserService = require('../services/user_service');
const UserService = new _UserService();
var config = {
    err_messages: {},
    expected_keys: [],
    not_null_keys: [],
    required_keys: []
};
let $this;

module.exports = class UserController {

    constructor() {
        
        $this = this;
        config.err_messages = {
            "roleId": "Role",
            "firstName": "First Name",
            "lastName": "Last Name",
            "email": "Email",
            "password": "Password",
            "contactNo": "Contact number",
            "gender": "Gender",
            "status": "Status"
        };
        
        config.expected_keys = [
            "roleId",
            "firstName",
            "lastName",
            "email",
            "password",
            "contactNo",
            "gender",
            "status"
        ];
        
        config.not_null_keys = [
            "roleId",
            "firstName",
            "lastName",
            "email",
            "password",
            "contactNo",
            "gender",
            "status"
        ];
        
        config.required_keys = [
            "roleId",
            "firstName",
            "lastName",
            "email",
            "password",
            "contactNo",
            "gender",
            "status"
        ];
    }
    
    isContactNoExistsAlready( req, res, contactNo, id, cb ) {

        if( id ) {

            // check by name where id not equals
            UserModel.find({ where: { contactNo: contactNo, id: { ne: id } } })
            .then((result) => {
                result === null ? cb( false ) : cb( true );
            })
            .catch((error) => {
                res.status(500).send({ "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
            });
        } else {
            
            // check by name only
            UserModel.find({ where: { contactNo: contactNo } })
            .then((result) => {
                result === null ? cb( false ) : cb( true );
            })
            .catch((error) => {
                res.status(500).send({ "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
            });
        }
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

            if( in_data.data.password != undefined ) {
                in_data.data.password = md5(in_data.data.password);
            }
            UserService.insertUser( req, in_data, ( status, result ) => {
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

            if( in_data.data.password != undefined ) {
                in_data.data.password = md5(in_data.data.password);
            }
            UserService.updateUser( req, in_data, id, ( status, result ) => {
                res.status(status).send(result);
            } );
        }
    }

    fetchAll(req, res, next) {
        
        let in_data = {};
        UserService.fetchAllUsers( req, in_data, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    fetchById(req, res, next) {

        let id = req.params.id;
        let in_data = {};
        UserService.fetchUsersById( req, in_data, id, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    softDelete(req, res, next) {

        let id = req.params.id;
        UserService.softDeleteUser( req, id, ( status, result ) => {
            res.status(status).send(result);
        } );
    }

    hardDelete(req, res, next) {

        let id = req.params.id;
        UserService.hardDeleteUser( req, id, ( status, result ) => {
            res.status(status).send(result);
        } );
    }
}