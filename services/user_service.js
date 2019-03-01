const UserModel = require('../models').User;
let $this;

module.exports = class RoleService {

    constructor() {

        $this = this;
        $this.attributes = ["id", "roleId", "firstName", "lastName", "email", "contactNo", "gender", "status", 'createdAt', 'updatedAt'];
    }

    isEmailExistsAlready( req, email, id, cb ) {

        if( id ) {

            // check by name where id not equals
            UserModel.find({ where: { email: email, id: { ne: id } } })
            .then((result) => {
                result === null ? cb( false ) : cb( true );
            })
            .catch((error) => {
                cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
            });
        } else {
            
            // check by name only
            UserModel.find({ where: { email: email } })
            .then((result) => {
                result === null ? cb( 200, false ) : cb( 200, true );
            })
            .catch((error) => {
                cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
            });
        }
    }

    insertUser( req, in_data, cb ) {

        UserModel.build(in_data.data).save()
        .then((result) => {
            cb( 201, { "result": { err: [in_data.err], input: in_data.data, output: result, message: "Record inserted successfully!" }} );
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: req.body, output: {}, message: "Database error occured!" }});
        });
    }

    updateUser( req, in_data, id, cb ) {

        UserModel.findOne({ where: { id: id } })
        .then((found) => {

            if (found === null) {
                cb( 204, { "result": { err:[], input: req.body, output: {}, message: 'Record not found!' }} );
            } else {
                UserModel.update(in_data.data, { where: { id: id } })
                .then((result) => {
                    cb( 201, { "result": { err: [in_data.err], input: in_data.data, output: result, message: "Record updated successfully!" }} );
                })
                .catch((error) => {
                    cb( 500, { "result": { err: [error], input: req.body, output: {}, message: "Database error occured!" }});
                });
            }
        });
    }

    fetchAllUsers( req, in_data, cb ) {

        UserModel.findAll({
            attributes: $this.attributes
        })
        .then((result) => {
            if (result == null) {
                cb( 204, { "result": { err:[], input: {}, output: {}, message: 'Record not found!' }} );
            } else {
                cb( 200, { "result": { err: [], input: req.params, output: result, message: "Records found!" }} );
            }
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: {}, output: {}, message: "Database error occured!" }} );
        });
    }

    fetchUsersById( req, in_data, id, cb ) {

        UserModel.find({ 
            attributes: $this.attributes,
            where: { id: id } 
        })
        .then((result) => {
            if (result == null) {
                cb( 204, { "result": { err:[], input: req.params, output: {}, message: 'Record not found!' }} );
            } else {
                cb( 200, { "result": { err: [], input: req.params, output: result, message: "Record found!" }} );
            }
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: in_data.data, output: {}, message: "Database error occured!" }} );
        });
    }

    softDeleteUser( req, id, cb ) {

        UserModel.find({ where: { id: id } })
        .then((result) => {
            if (result === null) {
                cb( 204, { "result": { err:[], input: req.params, output: {}, message: 'Record not found!' }} );
            } else {
                var in_data = {
                    status: 'DELETED'
                };

                UserModel.update(in_data, { where: { id: id } })
                .then((result) => {
                    cb( 200, { "result": { err: [], input: req.params, output: result, message: "Record deleted softly!" }} );
                })
                .catch((error) => {
                    cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
                });
            }
        })
        .catch((error) => {
            res.status(500).send({ "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
        });
    }

    hardDeleteUser(req, id, cb) {

        UserModel.find({ where: { id: id } })
        .then((result) => {
            if (result === null) {
                cb( 204, { "result": { err:[], input: req.params, output: {}, message: 'Record not found!' }} );
            } else {
                UserModel.destroy({ where: { id: id } })
                .then((result) => {
                    cb( 200, { "result": { err: [], input: req.params, output: result, message: "Record deleted successfully!" }} );
                })
                .catch((error) => {
                    cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
                });
            }
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
        });
    }
}