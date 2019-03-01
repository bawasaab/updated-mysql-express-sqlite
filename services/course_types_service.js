const CourseTypesModel = require('../models').CourseTypes;
let $this;

module.exports = class CourseTypeService {

    constructor() {

        $this = this;
        $this.attributes = ["id", "name", "status", 'createdAt', 'updatedAt'];
    }

    isExistsAlready( req, courseTypeName, courseTypeId, cb ) {

        if( id ) {
            // check by name where id not equals
            CourseTypesModel.find({ where: { name: courseTypeName, id: { ne: courseTypeId } } })
            .then((result) => {
                result === null ? cb( 200, false ) : cb( 200, true );
            })
            .catch((error) => {
                cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
            });
        } else {
            // check by name only
            CourseTypesModel.find({ where: { name: courseTypeName } })
            .then((result) => {
                result === null ? cb( 200, false ) : cb( 200, true );
            })
            .catch((error) => {
                cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
            });
        }
    }

    insert( req, in_data, cb ) {

        CourseTypesModel.build(in_data.data).save()
        .then((result) => {
            cb( 201, { "result": { err: [in_data.err], input: in_data.data, output: result, message: "Record inserted successfully!" }} );
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: req.body, output: {}, message: "Database error occured!" }});
        });
    }

    update( req, in_data, id, cb ) {

        CourseTypesModel.findOne({ where: { id: id, status: { ne: 'DELETED' } } })
        .then((found) => {

            if (found === null) {
                cb( 404, { "result": { err:[], input: req.body, output: {}, message: `Record not found aginst ID ${id}!` }} );
            } else {
                CourseTypesModel.update(in_data.data, { where: { id: id } })
                .then((result) => {
                    $this.fetchById( req, in_data, id, ( fetchStatus, fetchResult ) => {
                        if( fetchStatus == 200 ) {
                            cb( 200, { "result": { err: [in_data.err], input: in_data.data, output: result, message: "Record updated successfully!" }} );
                        } else {
                            cb( fetchStatus, { "result": { err: [fetchResult.err], input: fetchResult.data, output: fetchResult.output, message: fetchResult.message }} );
                        }
                    } );
                })
                .catch((error) => {
                    cb( 500, { "result": { err: [error], input: req.body, output: {}, message: "Database error occured!" }});
                });
            }
        });
    }

    fetchAll( req, cb ) {

        CourseTypesModel.findAll({
            attributes: $this.attributes,
            where: { status: { ne: 'DELETED' } }
        })
        .then((result) => {
            if ((result == null) || (parseInt(result.length) == 0)) {
                cb( 404, { "result": { err:[], input: {}, output: {}, message: 'Record not found!' }} );
            } else {
                cb( 200, { "result": { err: [], input: req.params, output: result, message: "Records found!" }} );
            }
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: {}, output: {}, message: "Database error occured!" }} );
        });
    }

    fetchAllOpened( req, cb ) {

        CourseTypesModel.findAll({
            attributes: $this.attributes,
            where: { status: 'OPEN' }
        })
        .then((result) => {
            if ((result == null) || (parseInt(result.length) == 0)) {
                cb( 404, { "result": { err:[], input: {}, output: {}, message: 'Record not found!' }} );
            } else {
                cb( 200, { "result": { err: [], input: req.params, output: result, message: "Records found!" }} );
            }
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: {}, output: {}, message: "Database error occured!" }} );
        });
    }

    fetchAllClosed( req, cb ) {

        CourseTypesModel.findAll({
            attributes: $this.attributes,
            where: { status: 'CLOSE' }
        })
        .then((result) => {
            if ((result == null) || (parseInt(result.length) == 0)) {
                cb( 404, { "result": { err:[], input: {}, output: {}, message: 'Record not found!' }} );
            } else {
                cb( 200, { "result": { err: [], input: req.params, output: result, message: "Records found!" }} );
            }
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: {}, output: {}, message: "Database error occured!" }} );
        });
    }

    fetchByCustomFilters( req, condition, cb ) {

        CourseTypesModel.findAll({
            attributes: $this.attributes,
            where: condition
        })
        .then((result) => {
            if ((result == null) || (parseInt(result.length) == 0)) {
                cb( 404, { "result": { err:[], input: req.query, output: {}, message: 'Record not found!' }} );
            } else {
                cb( 200, { "result": { err: [], input: req.params, output: result, message: "Records found!" }} );
            }
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: {}, output: {}, message: "Database error occured!" }} );
        });
    }

    fetchById( req, in_data, id, cb ) {

        CourseTypesModel.find({ 
            attributes: $this.attributes,
            where: { id: id, status: { ne: 'DELETED' } } 
        })
        .then((result) => {
            if (result == null) {
                cb( 404, { "result": { err:[], input: req.body, output: {}, message: `Record not found aginst ID ${id}!` }} );
            } else {
                cb( 200, { "result": { err: [], input: req.params, output: result, message: "Record found!" }} );
            }
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: in_data.data, output: {}, message: "Database error occured!" }} );
        });
    }

    softDelete( req, id, cb ) {

        CourseTypesModel.find({ where: { id: id } })
        .then((result) => {
            if (result === null) {
                cb( 404, { "result": { err:[], input: req.body, output: {}, message: `Record not found aginst ID ${id}!` }} );
            } else {

                if( result.status == 'DELETED' ) {
                    
                    cb( 410, { "result": { err:[], input: req.body, output: {}, message: `Record already deleted aginst ID ${id}!` }} );
                } else {

                    var in_data = {
                        status: 'DELETED'
                    };
    
                    CourseTypesModel.update(in_data, { where: { id: id } })
                    .then((res) => {
                        CourseTypesModel.find({ 
                            attributes: $this.attributes,
                            where: { id: id } 
                        })
                        .then((result1) => {
                            if (result1 == null) {
                                cb( 404, { "result": { err:[], input: req.body, output: {}, message: `Record not found aginst ID ${id}!` }} );
                            } else {
                                if( result1.status == 'DELETED' ) {
                                    cb( 200, { "result": { err: [], input: req.params, output: {}, message: "Record deleted successfully!" }} );
                                } else {
                                    cb( 304, { "result": { err: [], input: req.params, output: {}, message: "Unable to delete record!" }} );
                                }
                            }
                        })
                        .catch((error) => {
                            cb( 500, { "result": { err: [error], input: in_data.data, output: {}, message: "Database error occured!" }} );
                        });
                    })
                    .catch((error) => {
                        cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
                    });
                }
            }
        })
        .catch((error) => {
            res.status(500).send({ "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
        });
    }

    hardDelete( req, id, cb ) {

        CourseTypesModel.find({ where: { id: id } })
        .then((result) => {
            if (result === null) {
                cb( 404, { "result": { err:[], input: req.body, output: {}, message: `Record not found aginst ID ${id}!` }} );
            } else {
                CourseTypesModel.destroy({ where: { id: id } })
                .then((result) => {
                    CourseTypesModel.find({ 
                        attributes: $this.attributes,
                        where: { id: id } 
                    })
                    .then((result1) => {
                        if (result1 == null) {
                            cb( 200, { "result": { err: [], input: req.params, output: {}, message: "Record deleted successfully!" }} );
                        } else {
                            cb( 304, { "result": { err: [], input: req.params, output: {}, message: "Unable to delete record!" }} );
                        }
                    })
                    .catch((error) => {
                        cb( 500, { "result": { err: [error], input: in_data.data, output: {}, message: "Database error occured!" }} );
                    });
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

    hardUpdate( req, in_data, id, cb ) {

        CourseTypesModel.findOne({ where: { id: id } })
        .then((found) => {

            if (found === null) {
                cb( 204, { "result": { err:[], input: req.body, output: {}, message: 'Record not found!' }} );
            } else {
                CourseTypesModel.update(in_data.data, { where: { id: id } })
                .then((result) => {
                    cb( 200, { "result": { err: [in_data.err], input: in_data.data, output: result, message: "Record updated successfully!" }} );
                })
                .catch((error) => {
                    cb( 500, { "result": { err: [error], input: req.body, output: {}, message: "Database error occured!" }});
                });
            }
        });
    }
}