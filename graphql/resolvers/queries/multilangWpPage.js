const wordpressQuery = require('../../../services/queries/wordpressQuery');

const multilangWpPage = {
  type: 'WP_Page!',
  args: {
    language: 'LanguagesEnum',
    pageId: 'Int!'
  },
  resolve: (_, { language, pageId }) => wordpressQuery(`pages/${pageId}`, { language: language })
}

module.exports = multilangWpPage;