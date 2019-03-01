const RoleModel = require('../models').Role;
let $this;

module.exports = class RoleService {

    constructor() {

        $this = this;
        $this.attributes = ["id", "name", "status", 'createdAt', 'updatedAt'];
    }

    isRoleExistsAlready( req, roleName, roleId, cb ) {

        if( id ) {
            // check by name where id not equals
            RoleModel.find({ where: { name: roleName, id: { ne: roleId } } })
            .then((result) => {
                result === null ? cb( 200, false ) : cb( 200, true );
            })
            .catch((error) => {
                cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
            });
        } else {
            // check by name only
            RoleModel.find({ where: { name: roleName } })
            .then((result) => {
                result === null ? cb( 200, false ) : cb( 200, true );
            })
            .catch((error) => {
                cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
            });
        }
    }

    insertRole( req, in_data, cb ) {

        RoleModel.build(in_data.data).save()
        .then((result) => {
            cb( 201, { "result": { err: [in_data.err], input: in_data.data, output: result, message: "Record inserted successfully!" }} );
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: req.body, output: {}, message: "Database error occured!" }});
        });
    }

    updateRole( req, in_data, id, cb ) {

        RoleModel.findOne({ where: { id: id } })
        .then((found) => {

            if (found === null) {
                cb( 204, { "result": { err:[], input: req.body, output: {}, message: 'Record not found!' }} );
            } else {
                RoleModel.update(in_data.data, { where: { id: id } })
                .then((result) => {
                    cb( 201, { "result": { err: [in_data.err], input: in_data.data, output: result, message: "Record updated successfully!" }} );
                })
                .catch((error) => {
                    cb( 500, { "result": { err: [error], input: req.body, output: {}, message: "Database error occured!" }});
                });
            }
        });
    }

    fetchAllRoles( req, in_data, cb ) {

        RoleModel.findAll({
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

    fetchRolesById( req, in_data, id, cb ) {

        RoleModel.find({ 
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

    softDeleteRole( req, id, cb ) {

        RoleModel.find({ where: { id: id } })
        .then((result) => {
            if (result === null) {
                cb( 204, { "result": { err:[], input: req.params, output: {}, message: 'Record not found!' }} );
            } else {
                var in_data = {
                    status: 'DELETED'
                };

                RoleModel.update(in_data, { where: { id: id } })
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

    hardDeleteRole(req, id, cb) {

        RoleModel.find({ where: { id: id } })
        .then((result) => {
            if (result === null) {
                cb( 204, { "result": { err:[], input: req.params, output: {}, message: 'Record not found!' }} );
            } else {
                RoleModel.destroy({ where: { id: id } })
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