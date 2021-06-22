const services = require('../services')

module.exports = {
    uploadImg(req, res, next) {
        try {
            var imgData = {
                name: req.body.name,
                category: req.body.category,
                imgUrl: req.files,
                uploadedBy: req.token.id,
                downloadsCount: 0
            };

            var response = {};

            services.uploadImg(imgData, (err, result) => {
                if (err) {
                    response.success = false
                    response.statuscode = err.statuscode
                    response.message = err.message

                    res.status(err.statuscode).send(response)
                } else {
                    response.success = true
                    response.statuscode = result.statuscode
                    response.message = result.message
                    response.result = result.result

                    res.status(result.statuscode).send(response)
                }
            })
        } catch (err) {
            next(err)
        }
    },

    downloadCount(req, res, next) {
        try {
            var imgData = {
                id: req.token.id,
                imgId: req.params.id
            };

            var response = {};

            services.downloadCount(imgData, (err, result) => {
                if (err) {
                    response.success = false
                    response.statuscode = err.statuscode
                    response.message = err.message

                    res.status(err.statuscode).send(response)
                } else {
                    response.success = true
                    response.statuscode = result.statuscode
                    response.message = result.message
                    response.result = result.result

                    res.status(result.statuscode).send(response)
                }
            })
        } catch (err) {
            next(err)
        }
    },

    getReport(req, res, next) {
        try {
            var imgData = {
                id: req.token.id
            };

            var response = {};

            services.getReport(imgData, (err, result) => {
                if (err) {
                    response.success = false
                    response.statuscode = err.statuscode
                    response.message = err.message

                    res.status(err.statuscode).send(response)
                } else {
                    response.success = true
                    response.statuscode = result.statuscode
                    response.message = result.message
                    response.result = result.result

                    res.status(result.statuscode).send(response)
                }
            })
        } catch (err) {
            next(err)
        }
    },

    getImagesByCategory(req, res, next) {
        try {
            var imgData = {
                id: req.token.id,
                categoryId: req.params.categoryId
            };

            var response = {};

            services.getImagesByCategory(imgData, (err, result) => {
                if (err) {
                    response.success = false
                    response.statuscode = err.statuscode
                    response.message = err.message

                    res.status(err.statuscode).send(response)
                } else {
                    response.success = true
                    response.statuscode = result.statuscode
                    response.message = result.message
                    response.result = result.result

                    res.status(result.statuscode).send(response)
                }
            })
        } catch (err) {
            next(err)
        }
    },
}