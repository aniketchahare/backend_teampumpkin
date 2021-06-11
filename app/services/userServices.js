var model = require('../model'),
    { hashPassword, generateToken } = require('../../utility'),
    bcrypt = require('bcrypt'),
    message = "Something went wrong";

module.exports = {
    register(userData, callback) {
        try {
            model.findUser({ raw: true,where: { emailId: userData.emailId } }, async (err, data) => {
                if (err) return callback({ message: message, statuscode: 400 }, null)
                else {
                    if (data.length === 0) {
                        userData.password = await hashPassword(userData.password)
                        model.register(userData, (err, result) => {
                            if (err) return callback({ message: message, statuscode: 400 }, null)
                            else {
                                return callback(null, {
                                    message: "Created successfully",
                                    statuscode: 201
                                })
                            }
                        })
                    } else return callback(null, {
                        message: `[${data[0].emailId}] is already registered`,
                        statuscode: 409
                    })
                }
            })
        } catch (err) {
            return callback({ message: message, statuscode: 404 }, null)
        }
    },

    signIn(userData, callback) {
        try {
            model.findUser({ raw: true,where: { emailId: userData.emailId } }, async (err, result) => {
                if (err) return callback({ message: message, statuscode: 400 }, null)
                else {
                    if (result.length === 0) {
                        return callback(null, { message: "No user found. Invalid login credentials", statuscode: 404 });
                    } else {
                        bcrypt.compare(userData.password, result[0].password, async (err, res) => {
                            if (err) return callback({ message: message, statuscode: 400 }, null)
                            else {
                                if (res) {
                                    let payload = {
                                        id: result[0].id,
                                        userType: result[0].userType,
                                        emailId: result[0].emailId
                                    }

                                    let accessToken = await generateToken(payload);
                                    if (accessToken.auth) {
                                        // utility.otpService()
                                        return callback(null, {
                                            message: `Successfully signed in [${result[0].userType}] user`,
                                            result: {
                                                name: result[0].name,
                                                emailId: result[0].emailId,
                                                userType: result[0].userType,
                                                accessToken: accessToken.token
                                            },
                                            statuscode: 200
                                        })
                                    } else return callback(null, { message: accessToken.message, statuscode: 401 })
                                } else {
                                    return callback(null, { message: "please enter valid password", statuscode: 404 })
                                }
                            }
                        })
                    }
                }
            })
        } catch (err) {
            return callback({ message: message, statuscode: 404 }, null)
        }
    },

}