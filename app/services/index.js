module.exports = {
    // user
    register: require('./userServices').register,
    signIn: require('./userServices').signIn,

    // category
    createCategory: require('./categoryServices').createCategory,
    getCategories: require('./categoryServices').getCategories,
    updateCategory: require('./categoryServices').updateCategory,

    // images
    uploadImg: require('./imageServices').uploadImg,
    downloadCount: require('./imageServices').downloadCount,
    getReport: require('./imageServices').getReport,
    getImagesByCategory: require('./imageServices').getImagesByCategory,
}