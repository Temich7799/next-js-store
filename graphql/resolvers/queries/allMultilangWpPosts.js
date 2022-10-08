const wordpressQuery = require('../../../services/queries/wordpressQuery');

const allMultilangWpPosts = {
    type: ['WP_Page!'],
    args: {
        language: 'LanguagesEnum',
        filter: 'WP_PageFilter'
    },
    resolve: (_, { language, filter }) => wordpressQuery('posts', { language: language, filter: filter })
}

module.exports = allMultilangWpPosts;