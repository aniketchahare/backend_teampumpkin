module.exports = {
    // user
    register: require('./userModel').create,
    findUser: require('./userModel').find,

    // category
    createCategory: require('./categoryModel').create,
    findCategory: require('./categoryModel').find,
    updateCategory: require('./categoryModel').update,

    // images
    uploadImg: require('./imageModel').create,
    findImg: require('./imageModel').find,
    downloadCount: require('./imageModel').update,
    getReport: require('./imageModel').get,
    getImagesByCategory: require('./imageModel').getByCategory,
}