const services = require('../services')

module.exports = {
    createCategory(req, res, next) {
        try {
            var categoryData = {
                name: req.body.name
            };

            var response = {};

            services.createCategory(categoryData, (err, result) => {
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

    getCategories(req, res, next) {
        try {
            var categoryData = {
                status: 'ACTIVE'
            };

            var response = {};

            services.getCategories(categoryData, (err, result) => {
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

    updateCategory(req, res, next) {
        try {
            var categoryData = {
                id: req.params.id,
                data: {}
            };

            var response = {};

            let keys = Object.keys(req.body);
            for (var i = 0; i < keys.length; i++) {
                categoryData.data[keys[i]] = req.body[keys[i]]
            }

            services.updateCategory(categoryData, (err, result) => {
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