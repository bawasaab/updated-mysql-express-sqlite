const CourseLevelModel = require('../models').CourseLevel;
let $this;

module.exports = class CourseLevelService {

    constructor() {

        $this = this;
        $this.attributes = ["id", "name", "status", 'createdAt', 'updatedAt'];
    }

    isExistsAlready( req, CourseLevelName, CourseLevelId, cb ) {

        if( id ) {
            // check by name where id not equals
            CourseLevelModel.find({ where: { name: CourseLevelName, id: { ne: CourseLevelId } } })
            .then((result) => {
                result === null ? cb( 200, false ) : cb( 200, true );
            })
            .catch((error) => {
                cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
            });
        } else {
            // check by name only
            CourseLevelModel.find({ where: { name: CourseLevelName } })
            .then((result) => {
                result === null ? cb( 200, false ) : cb( 200, true );
            })
            .catch((error) => {
                cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
            });
        }
    }

    insert( req, in_data, cb ) {

        CourseLevelModel.build(in_data.data).save()
        .then((result) => {
            cb( 201, { "result": { err: [in_data.err], input: in_data.data, output: result, message: "Record inserted successfully!" }} );
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: req.body, output: {}, message: "Database error occured!" }});
        });
    }

    update( req, in_data, id, cb ) {

        CourseLevelModel.findOne({ where: { id: id, status: { ne: 'DELETED' } } })
        .then((found) => {

            if (found === null) {
                cb( 404, { "result": { err:[], input: req.body, output: {}, message: `Record not found aginst ID ${id}!` }} );
            } else {
                CourseLevelModel.update(in_data.data, { where: { id: id } })
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

        CourseLevelModel.findAll({
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

        CourseLevelModel.findAll({
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

        CourseLevelModel.findAll({
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

        CourseLevelModel.findAll({
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

        CourseLevelModel.find({ 
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

        CourseLevelModel.find({ where: { id: id, status: { ne: 'DELETED' } } })
        .then((result) => {
            if (result === null) {
                cb( 404, { "result": { err:[], input: req.body, output: {}, message: `Record not found aginst ID ${id}!` }} );
            } else {
                var in_data = {
                    status: 'DELETED'
                };

                CourseLevelModel.update(in_data, { where: { id: id } })
                .then((result) => {
                    $this.fetchById( req, in_data, id, ( fetchStatus, fetchResult ) => {
                        if( fetchStatus == 200 ) {
                            if( fetchResult.output.status != 'DELETED' ) {
                                cb( 500, { "result": { err: [], input: req.params, output: fetchResult, message: "Unable to delete record softly!" }} );
                            } else {
                                cb( 200, { "result": { err: [], input: req.params, output: result, message: "Record deleted softly!" }} );
                            }
                        } else {
                            cb( fetchStatus, { "result": { err: [fetchResult.err], input: fetchResult.data, output: fetchResult.output, message: fetchResult.message }} );
                        }
                    } );
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

    hardDelete( req, id, cb ) {

        CourseLevelModel.find({ where: { id: id } })
        .then((result) => {
            if (result === null) {
                cb( 404, { "result": { err:[], input: req.body, output: {}, message: `Record not found aginst ID ${id}!` }} );
            } else {
                CourseLevelModel.destroy({ where: { id: id } })
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

    hardUpdate( req, in_data, id, cb ) {

        CourseModel.findOne({ where: { id: id } })
        .then((found) => {

            if (found === null) {
                cb( 204, { "result": { err:[], input: req.body, output: {}, message: 'Record not found!' }} );
            } else {
                CourseModel.update(in_data.data, { where: { id: id } })
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