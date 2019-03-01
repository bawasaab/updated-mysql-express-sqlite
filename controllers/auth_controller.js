const md5 = require('md5');
const CommonCntrl = require('./common_controller');
const _AuthService = require('../services/auth_service');
const AuthService = new _AuthService();

let $this;
var config = {
    err_messages: {},
    expected_keys: [],
    not_null_keys: [],
    required_keys: []
};

module.exports = class AuthController {

    constructor() {

        $this = this;
        config.err_messages = {
            'email': "Email",
            'password': "Password"
        };
        
        config.expected_keys = [
            'email',
            'password'
        ];
        
        config.not_null_keys = [
            'email',
            'password'
        ];
        
        config.required_keys = [
            'email',
            'password'
        ];
    }

    signin( req, res, next ) {

        let in_data = {};
        let obj = new CommonCntrl(  config );
        in_data = obj.check_inputs(req.body, true);

        if (in_data.err.length > 0) {
    
            res.status(400).send({ result: { err: in_data.err, input: req.body, output: {}, message: "Bad request!" } });
        } else if ((typeof in_data.err.err != "undefined") && (in_data.err.err.length > 0)) {
    
            res.status(400).send({ result: { err: in_data.err, input: req.body, output: {}, message: "Bad request!" } });
        } else {

            let in_data = {
                email: req.body.email, 
                password: md5(req.body.password)
            };
            
            AuthService.signin( req, in_data, ( status, result ) => {

                res.status(status).send(result);
            } );
        }
    }
    
    verifyToken(req, res, next) {
        AuthService.verifyToken( req, ( status, err ) => status == '200' ? next() : res.status(status).send(err));
    }

    verifyAccess( req, res, next ) {
        AuthService.verifyAccess( req, ( status, err ) => status == '200' ? next() : res.status(status).send(err));
    }
}