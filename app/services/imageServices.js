var model = require('../model'),
    { deleteImg } = require('../../utility'),
    message = "Something went wrong";

module.exports = {
    uploadImg(imgData, callback) {
        try {
            model.uploadImg(imgData, (err, result) => {
                if (err) {
                    deleteImg(imgData.imgUrl)
                    return callback({ message: message, statuscode: 400 }, null)
                }
                else return callback(null, {
                    message: "Uploaded successfully",
                    statuscode: 200
                })
            })
        } catch (err) {
            deleteImg(imgData.imgUrl)
            return callback({ message: message, statuscode: 404 }, null)
        }
    },

    downloadCount(imgData, callback) {
        try {
            model.findImg({ raw: true, where: { id: imgData.imgId } }, async (err, data) => {
                if (err) return callback({ message: message, statuscode: 400 }, null)
                else {
                    if (data.length !== 0) {
                        model.downloadCount(imgData, (err, result) => {
                            if (err) return callback({ message: message, statuscode: 400 }, null)
                            else return callback(null, {
                                message: "Download count increased",
                                statuscode: 200
                            })
                        })
                    } else return callback(null, {
                        message: `[${imgData.imgId}] is not present`,
                        statuscode: 409
                    })
                }
            })
        } catch (err) {
            return callback({ message: message, statuscode: 404 }, null)
        }
    },

    getReport(imgData, callback) {
        try {
            model.getReport(imgData, (err, result) => {
                if (err) return callback({ message: message, statuscode: 400 }, null)
                else return callback(null, {
                    message: "Fetched report successfully",
                    result: result,
                    statuscode: 200
                })
            })
        } catch (err) {
            return callback({ message: message, statuscode: 404 }, null)
        }
    },

    getImagesByCategory(imgData, callback) {
        try {
            model.getImagesByCategory(imgData, (err, result) => {
                if (err) return callback({ message: message, statuscode: 400 }, null)
                else return callback(null, {
                    message: "Fetched successfully",
                    result: result,
                    statuscode: 200
                })
            })
        } catch (err) {
            return callback({ message: message, statuscode: 404 }, null)
        }
    },
}