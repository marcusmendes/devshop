const slug = require('../utils/slug')

const getCategoryById = db => async (id) => {
    const category = await db('categories')
        .select('*')
        .where('id', id)
    return category
}

const getCategories = db => async () => {
    const categories = await db('categories').select('*')
    const categoriesWithSlug = categories.map(category => {
        return { ...category, slug: slug(category.category)}
    })
    return categoriesWithSlug
}

module.exports = {
    getCategoryById,
    getCategories
}