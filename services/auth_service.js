const jwt = require('jsonwebtoken');
const User = require('../models').User;
const accesses = require('../config/access');
const constantsObj = require('../config/constants');
const constants = new constantsObj();

module.exports = class AuthService {

    constructor() {}

    signin( req, in_data, cb ) {

        User.find({ where: { email: in_data.email, password: in_data.password  } })
        .then((result) => {

            if (result === null) {

                cb( 204, { err: ["Record not found!"] } );
            } else {

                let userData = {
                    "id": result.id,
                    "roleId": result.roleId,
                    "firstName": result.firstName,
                    "lastName": result.lastName,
                    "email": result.email,
                    "contactNo": result.contactNo,
                    "gender": result.gender,
                    "status": result.status
                };

                jwt.sign({userData}, constants.JWT_SECRET, { expiresIn: 60 * 60 * 24 }, (err, token) => {

                    cb( 200, { "result": { err: [], input: { email : req.body.email }, output: userData, token: 'bearer '+ token, message: "Record found!" }} );
                });
            }
        })
        .catch((error) => {

            cb( 500, { err: error } );
        });
    }

    verifyToken( req, cb ) {

        //Request header with authorization key
        const bearerHeader = req.headers['authorization'];
        
        //Check if there is  a header
        if(typeof bearerHeader !== 'undefined') {
            const bearer = bearerHeader.split(' ');
            
            //Get Token arrray by spliting
            const bearerToken = bearer[1];
            req.token = bearerToken;
    
            jwt.verify( req.token, constants.JWT_SECRET, (err, authData ) => {
    
                if(err){
                    cb( 403, { err: err } );
                }else{
                    
                    req.authData = authData;
                    cb( 200, { err: null } );
                }
            });
        }else{
            cb( 403, { err: 'Header is not defined.' } )
        }
    }

    verifyAccess( req, cb ) {

        let full_path = req.baseUrl + req.route.path;
        let roleId = req.authData.userData.roleId;
        let requestedMethod = req.method;

        if( accesses.hasOwnProperty( full_path ) ) {

            if( accesses[full_path].hasOwnProperty( roleId ) ) {

                let allowedMethods = accesses[full_path][roleId];
                if ( allowedMethods.indexOf( requestedMethod ) > -1 ) {
                    //call next middleware
                    cb( 200, { err: null } );
                } else {
                    // Unauthorized Access
                    cb( 403, { err: `Unauthorized access. RoleId(${roleId}) do not have access to the ${requestedMethod} method at ${full_path} route.` } );
                }
            } else {

                cb( 403, { err: `Unauthorized access. RoleId(${roleId}) is not defined in the /config/access.json and do not have access to the ${requestedMethod} method.` } );
            }
        } else {
            // Path is not declared in the /config/access.json
            cb(403, { err: `Route ${full_path} is not defined in the /config/access.json` });
        }
    }
}