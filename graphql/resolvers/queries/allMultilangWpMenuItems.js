const wordpressQuery = require('../../../services/queries/wordpressQuery');

const allMultilangWpMenuItems = {
    type: ['WP_MenuItem!'],
    args: {
        slug: 'String!',
        language: 'LanguagesEnum',
        filter: 'WP_MenuItemFilter'
    },
    resolve: (_, { language, slug, filter }) => wordpressQuery(`menus/v1/menus/${slug}`, { language: language, filter: filter }, ['items'], 'none'),
}

module.exports = allMultilangWpMenuItems;