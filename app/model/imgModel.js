'use strict'

var db = require('../../config/dbConfig');
var Image = require('./imageModel').Image;

var ImageUrls = db.sequelize.define('imgurls', {
    id: {
        type: db.Sequelize.UUID,
        defaultValue: db.Sequelize.UUIDV1,
        primaryKey: true
    },
    imageId: {
        type: db.Sequelize.UUID,
        allowNull: false,
        required: true
    },
    url: {
        type: db.Sequelize.STRING,
        allowNull: false,
        required: true
    }
});

module.exports = {
    ImageUrls: ImageUrls,
}