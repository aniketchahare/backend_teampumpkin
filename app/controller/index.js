module.exports = {
    // user
    register: require('./userController').register,
    signIn: require('./userController').signIn,

    // category
    createCategory: require('./categoryController').createCategory,
    getCategories: require('./categoryController').getCategories,
    updateCategory: require('./categoryController').updateCategory,

    // images
    uploadImg: require('./imageController').uploadImg,
    downloadCount: require('./imageController').downloadCount,
    getReport: require('./imageController').getReport,
    getImagesByCategory: require('./imageController').getImagesByCategory,
}