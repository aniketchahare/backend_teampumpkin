const multer = require('multer');

const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed! [jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG], [Image size should be less than 3mb]'), false);
    }
    cb(null, true);
};

var upload = multer({
    fileFilter: imageFilter,
    limits: {
        fileSize: 3145728  // 3MB
    },
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, `./${process.env.IMAGESLOCAL}`);
        },
        filename: function (req, file, callback) {
            callback(null, Date.now() + '-' + file.originalname);
        }
    })
});

module.exports = { upload: upload };