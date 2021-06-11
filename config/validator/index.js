const { buildCheckFunction } = require('express-validator');
const { isInteger } = require('lodash');
const checkBodyAndQuery = buildCheckFunction(['body', 'params']);

module.exports = {
    val_user: [
        checkBodyAndQuery('name').rtrim().ltrim()
            .isString()
            .exists()
            .notEmpty().withMessage(`name is a required field`)
            .matches(/^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/)
            .withMessage(`name should contain only alphabets`)
            .isLength({ min: 3 }).withMessage(`name must at least 3 character`)
        ,
        checkBodyAndQuery('emailId').trim().escape()
            .notEmpty().withMessage(`Email id is a required field`)
            .exists()
            .isEmail().withMessage('Invalid email')
        ,
        checkBodyAndQuery('password').trim().escape()
            .exists()
            .isString()
            .notEmpty().withMessage(`Password is a required field`)
            .isLength({ min: 3 })
            .withMessage('Password length must be at least 3')
    ],
    val_signIn: [
        checkBodyAndQuery('emailId').trim().escape()
            .notEmpty().withMessage(`Email id is a required field`)
            .exists()
            .isEmail().withMessage('Invalid email')
        ,
        checkBodyAndQuery('password').trim().escape()
            .exists()
            .isString()
            .notEmpty().withMessage(`Password is a required field`)
            .isLength({ min: 3 })
            .withMessage('Password length must be at least 3')
        ,
    ],
}