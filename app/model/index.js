module.exports = {
    // user
    register: require('./userModel').create,
    findUser: require('./userModel').find,

    // category
    // Category: require('./categoryModel').Category,
    createCategory: require('./categoryModel').create,
    findCategory: require('./categoryModel').find,
    updateCategory: require('./categoryModel').update,

    // images
    // Image: require('./imageModel').Image,
    uploadImg: require('./imageModel').create,
    findImg: require('./imageModel').find,
    downloadCount: require('./imageModel').update,
    getReport: require('./imageModel').get,
    getImagesByCategory: require('./imageModel').getByCategory,

    // imageUrls
    // ImageUrls: require('./imgModel').ImageUrls,
    addUrls: require('./imgModel').create,
}