var model = require('../model'),
    message = "Something went wrong";

module.exports = {
    createCategory(categoryData, callback) {
        try {
            model.findCategory({ raw: true, where: { name: categoryData.name } }, async (err, data) => {
                if (err) return callback({ message: message, statuscode: 400 }, null)
                else {
                    if (data.length === 0) {
                        model.createCategory(categoryData, (err, result) => {
                            if (err) return callback({ message: message, statuscode: 400 }, null)
                            else {
                                return callback(null, {
                                    message: "Created successfully",
                                    statuscode: 201
                                })
                            }
                        })
                    } else return callback(null, {
                        message: `[${data[0].name}] is already present`,
                        statuscode: 409
                    })
                }
            })
        } catch (err) {
            return callback({ message: message, statuscode: 404 }, null)
        }
    },

    getCategories(categoryData, callback) {
        try {
            model.findCategory({ raw: true, where: { status: categoryData.status } }, (err, data) => {
                if (err) return callback({ message: message, statuscode: 400 }, null);
                return callback(null, {
                    message: "Fetched categories successfully",
                    result: data,
                    statuscode: 200
                })
            })
        } catch (err) {
            return callback({ message: message, statuscode: 404 }, null)
        }
    },

    updateCategory(categoryData, callback) {
        try {
            model.findCategory({ raw: true, where: { id: categoryData.id } }, async (err, data) => {
                if (err) return callback({ message: message, statuscode: 400 }, null)
                else {
                    if (data.length !== 0) {
                        model.updateCategory(categoryData.data, { where: { id: categoryData.id } }, (err, data) => {
                            if (err) return callback({ message: message, statuscode: 400 }, null);
                            return callback(null, {
                                message: "Updated successfully",
                                result: data,
                                statuscode: 200
                            })
                        })
                    } else return callback(null, {
                        message: `[${categoryData.id}] is not present`,
                        statuscode: 409
                    })
                }
            })
        } catch (err) {
            return callback({ message: message, statuscode: 404 }, null)
        }
    },
}