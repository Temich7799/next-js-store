const wordpressQuery = require('../../../services/queries/wordpressQuery');

const multilangWpMetaData = {
  type: 'WP_MetaData!',
  args: {
    language: 'LanguagesEnum',
    pageId: 'Int!',
    endpoint: 'RestEndpointsEnum!'
  },
  resolve: (_, { endpoint, language, pageId }) => wordpressQuery(`${endpoint}?id=${pageId}`, { language: language }).then((res) => res[0].yoast_head_json),
}

module.exports = multilangWpMetaData;