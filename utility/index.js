const bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    fs = require('fs'),
    upload = require('../config/multer').upload,
    unauthorize = { success: false, statuscode: 401, message: "Unauthorized user" },
    message = "Someting went wrong";

module.exports = {
    setUserType: (userType) => (req, _res, next) => {
        var data = { name: userType }
        req.userType = data
        return next();
    },

    checkUserType: (userTypes) => (req, res, next) => {
        return !userTypes.includes(req.token.userType)
            ? res.status(401).json(unauthorize)
            : next();
    },

    hashPassword: (password) => {
        const saltRounds = bcrypt.genSaltSync(10);
        var hashPassword = bcrypt.hashSync(password, saltRounds);
        return hashPassword;
    },

    generateToken: (payload) => {
        try {
            var token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_LIFE });
            return { auth: true, message: "Token generated", token: token }
        }
        catch (err) {
            return { auth: false, message: message };
        }
    },

    verifyToken: (req, res, next) => {
        try {
            var token = req.headers['x-access-token'] || req.headers["token"] || req.params.token;
            if (!token) return res.status(401).send({ auth: false, statuscode: 401, message: 'No token provided.' });
            jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
                if (err) { return res.status(401).json({ auth: false, statuscode: 401, message: 'Failed to authenticate..', error: err }); }
                req.token = decoded  //token added in the request process

                return next();
            })
        }
        catch (err) {
            return res.status(401).json({
                auth: false,
                statuscode: 401,
                message: 'Failed to authenticate'
            });
        }
    },

    storeImg: (req, res, next) => {
        var singleUpload = upload.array('file', 12);

        singleUpload(req, res, (err, data) => {
            if (err) {
                console.error("error occur in uploadImg utility callback", err.message)
                return res.status(400).json({ message: err.message, statuscode: 400 })
            }

            if ([undefined, "", null].includes(req.files)) {
                return next();
            }

            let filesArr = req.files.map(val => val.path)
            req.files = filesArr;
            next();
        })
    },

    deleteImg: deleteImg,
}

function deleteImg(file) {
    if (![undefined, "", null].includes(file)) {
        fs.unlink(`./${file}`, (err) => {
            if (err) console.error("Failed to delete local image:" + err);
            else console.info('Successfully deleted local image');
        });
    }
}