var express = require('express'),
    routes = express.Router(),
    { checkUserType,
        setUserTyp,
        verifyToken,
        storeImg
    } = require('../../utility'),
    {
        val_user,
        val_signIn,
    } = require('../../config/validator'),
    validate = require('../middleware/validate').validate,
    controller = require('../controller');

// user
routes.post('/create-user'
    , val_user
    , validate
    , controller.register);

routes.post('/signin-user'
    , val_signIn
    , validate
    , controller.signIn);

// category
routes.post('/category/create'
    , validate
    , verifyToken
    , checkUserType(['contributer'])
    , controller.createCategory);

routes.get('/category'
    , validate
    , verifyToken
    , checkUserType(['contributer', 'normal'])
    , controller.getCategories);

routes.put('/category/:id'
    , validate
    , verifyToken
    , checkUserType(['contributer'])
    , controller.updateCategory);

routes.post('/upload/image'
    , validate
    , storeImg
    , verifyToken
    , checkUserType(['contributer'])
    , controller.uploadImg);

routes.get('/download/report'
    , validate
    , verifyToken
    , checkUserType(['contributer'])
    , controller.getReport);

routes.put('/download/image/count/:id'
    , validate
    , verifyToken
    , checkUserType(['normal'])
    , controller.downloadCount);

routes.get('/images/:categoryId'
    , validate
    , verifyToken
    , checkUserType(['normal'])
    , controller.getImagesByCategory);

module.exports = routes;