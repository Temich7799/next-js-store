const wordpressQuery = require('../../../services/queries/wordpressQuery');

const allMultilangWpPages = {
  type: ['WP_Page!'],
  args: {
    language: 'LanguagesEnum',
    filter: 'WP_PageInput'
  },
  resolve: (_, { language, filter }) => wordpressQuery('pages', { language: language, filter: filter })
}

module.exports = allMultilangWpPages;