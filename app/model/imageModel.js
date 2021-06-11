'use strict'

var db = require('../../config/dbConfig')
var Category = require('../model/categoryModel').Category;
var User = require('../model/userModel').User;

var Image = db.sequelize.define('images', {
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
    category: {
        type: db.Sequelize.UUID,
        allowNull: false,
        required: true
    },
    imgUrl: {
        type: db.Sequelize.STRING,
        allowNull: false,
        required: true,
        trim: true
    },
    downloadsCount: {
        type: db.Sequelize.INTEGER,
        required: true,
        defaultValue: 0
    },
    uploadedBy: {
        type: db.Sequelize.UUID,
        allowNull: false,
        required: true,
    }
})

Image.belongsTo(Category, {
    foreignKey: "category",
    as: "categoryDetails",
})

Image.belongsTo(User, {
    foreignKey: "uploadedBy",
    as: "uploadedByDetails",
})

module.exports = {
    Image: Image,

    create(imgData, callback) {
        try {
            Image.create(imgData)
                .then(result => {
                    return callback(null, result)
                })
        } catch (err) {
            return callback(message, null)
        }
    },

    find(imgData, callback) {
        try {
            Image.findAll(imgData)
                .then(result => {
                    return callback(null, result)
                })
        } catch (err) {
            return callback(message, null)
        }
    },

    update(imgData, callback) {
        try {
            Image.update({ downloadsCount: db.Sequelize.literal('downloadsCount + 1') }, { where: { id: imgData.imgId } })
                .then(result => {
                    return callback(null, result)
                })
        } catch (err) {
            return callback(message, null)
        }
    },

    get(_imgData, callback) {
        try {
            Image.findAll({
                include: [{
                    association: 'uploadedByDetails',
                    attributes: ['name', 'userType']
                }, {
                    association: 'categoryDetails',
                    attributes: ['name']
                }]
            })
                .then(result => {
                    return callback(null, result)
                })
        } catch (err) {
            console.log(err);
            return callback(message, null)
        }
    },

    getByCategory(imgData, callback) {
        try {
            Image.findAll({
                include: [{
                    association: 'uploadedByDetails',
                    attributes: ['name', 'userType']
                }],
                where: { category: imgData.categoryId }
            })
                .then(result => {
                    return callback(null, result)
                })
        } catch (err) {
            console.log(err);
            return callback(message, null)
        }
    }
}