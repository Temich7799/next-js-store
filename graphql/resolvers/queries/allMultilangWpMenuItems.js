const wordpressQuery = require('../../../services/queries/wordpressQuery');

const allMultilangWpMenuItems = {
    type: ['WP_MenuItem!'],
    args: {
        language: 'LanguagesEnum',
        slug: 'String!'
    },
    resolve: (_, { language, slug }) => wordpressQuery(`menus/v1/menus/${slug}`, { language: language }, 'none').then(responce => responce.items)
}

module.exports = allMultilangWpMenuItems;