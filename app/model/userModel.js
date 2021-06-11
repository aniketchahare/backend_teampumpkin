'use strict'

var db = require('../../config/dbConfig')

var User = db.sequelize.define('users', {
    id: {
        type: db.Sequelize.UUID,
        defaultValue: db.Sequelize.UUIDV1,
        primaryKey: true
    },
    name: {
        type: db.Sequelize.STRING,
        allowNull: false,
        required: true,
        trim: true
    },
    emailId: {
        type: db.Sequelize.STRING,
        allowNull: false,
        required: true,
        trim: true
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false,
    },
    userType: {
        type: db.Sequelize.ENUM,
        values: ["normal", "contributer"],
        defaultValue: "normal"
    }
})

module.exports = {
    User : User,
    
    create(userData, callback) {
        try {
            User.create(userData)
                .then(result => {
                    return callback(null, result)
                })
        } catch (err) {
            return callback(message, null)
        }
    },

    find(userData, callback) {
        try {
            User.findAll(userData)
                .then(data => {
                    return callback(null, data)
                })
        } catch (err) {
            return callback(message, null)
        }
    },
}