const wordpressQuery = require('../../../services/queries/wordpressQuery');

const multilangWpPage = {
  type: 'WP_Page!',
  args: {
    language: 'LanguagesEnum',
    pageId: 'Int!',
    endpoint: 'RestEndpointsEnum!'
  },
  resolve: (_, { endpoint, language, pageId }) => wordpressQuery(`${endpoint}?id=${pageId}`, { language: language }).then((res) => res[0].yoast_head_json),
}

module.exports = multilangWpPage;