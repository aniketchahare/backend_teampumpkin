const services = require('../services')

module.exports = {
    register(req, res, next) {
        try {
            var userData = {
                name: req.body.name,
                emailId: req.body.emailId,
                password: req.body.password,
                userType: req.body.userType,
            };

            var response = {};

            services.register(userData, (err, result) => {
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

    signIn(req, res, next) {
        try {
            var userData = {
                emailId : req.body.emailId,
                password: req.body.password
            };

            var response = {};

            services.signIn(userData, (err, result) => {
                if (err) {
                    response.success    = false
                    response.statuscode = err.statuscode
                    response.message    = err.message

                    return res.status(err.statuscode).send(response)
                } else {
                    response.success    = true
                    response.statuscode = result.statuscode
                    response.message    = result.message
                    response.result     = result.result

                    return res.status(result.statuscode).send(response)
                }
            })
        } catch (err) {
            next(err)
        }
    },
}