'use strict'

var db = require('../../config/dbConfig')

var Category = db.sequelize.define('categories', {
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
    status: {
        type: db.Sequelize.ENUM,
        values: ["ACTIVE", "INACTIVE"],
        defaultValue: "ACTIVE"
    }
})

module.exports = {
    Category: Category,

    create(categoryData, callback) {
        try {
            Category.create(categoryData)
                .then(result => {
                    return callback(null, result)
                })
        } catch (err) {
            return callback(message, null)
        }
    },

    find(categoryData, callback) {
        try {
            Category.findAll(categoryData)
                .then(data => {
                    return callback(null, data)
                })
        } catch (err) {
            return callback(message, null)
        }
    },

    update(categoryData, cond, callback) {
        try {
            Category.update(categoryData, cond)
                .then(data => {
                    return callback(null, data)
                })
        } catch (err) {
            return callback(message, null)
        }
    },
}