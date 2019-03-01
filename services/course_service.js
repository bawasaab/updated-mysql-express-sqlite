const CourseModel = require('../models').Course;
let $this;

module.exports = class CourseService {

    constructor() {

        $this = this;
        $this.attributes = ["id", "name", "description", "duration", "durationType", "status", 'createdAt', 'updatedAt'];
    }

    isCourseExistsAlready( req, courseName, courseId, cb ) {

        if( id ) {
            // check by name where id not equals
            CourseModel.find({ where: { name: courseName, id: { ne: courseId } } })
            .then((result) => {
                result === null ? cb( 200, false ) : cb( 200, true );
            })
            .catch((error) => {
                cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
            });
        } else {
            // check by name only
            CourseModel.find({ where: { name: courseName } })
            .then((result) => {
                result === null ? cb( 200, false ) : cb( 200, true );
            })
            .catch((error) => {
                cb( 500, { "result": { err: [error], input: req.params, output: {}, message: "Database error occured!" }} );
            });
        }
    }

    insertCourse( req, in_data, cb ) {

        CourseModel.build(in_data.data).save()
        .then((result) => {
            cb( 201, { "result": { err: [in_data.err], input: in_data.data, output: result, message: "Record inserted successfully!" }} );
        })
        .catch((error) => {
            cb( 500, { "result": { err: [error], input: req.body, output: {}, message: "Database error occured!" }});
        });
    }

    updateCourse( req, in_data, id, cb ) {

        CourseModel.findOne({ where: { id: id } })
        .then((found) => {

            if (found === null) {
                cb( 204, { "result": { err:[], input: req.body, output: {}, message: 'Record not found!' }} );
            } else {
                CourseModel.update(in_data.data, { where: { id: id } })
                .then((result) => {
                    cb( 201, { "result": { err: [in_data.err], input: in_data.data, output: result, message: "Record updated successfully!" }} );
                })
                .catch((error) => {
                    cb( 500, { "result": { err: [error], input: req.body, output: {}, message: "Database error occured!" }});
                });
            }
        });
    }

    fetchAllCourses( req, in_data, cb ) {

        CourseModel.findAll({
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

    fetchCoursesById( req, in_data, id, cb ) {

        CourseModel.find({ 
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

    softDeleteCourse( req, id, cb ) {

        CourseModel.find({ where: { id: id } })
        .then((result) => {
            if (result === null) {
                cb( 204, { "result": { err:[], input: req.params, output: {}, message: 'Record not found!' }} );
            } else {
                var in_data = {
                    status: 'DELETED'
                };

                CourseModel.update(in_data, { where: { id: id } })
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

    hardDeleteCourse(req, id, cb) {

        CourseModel.find({ where: { id: id } })
        .then((result) => {
            if (result === null) {
                cb( 204, { "result": { err:[], input: req.params, output: {}, message: 'Record not found!' }} );
            } else {
                CourseModel.destroy({ where: { id: id } })
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