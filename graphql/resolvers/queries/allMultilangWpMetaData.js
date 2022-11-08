const wordpressQuery = require('../../../services/queries/wordpressQuery');

const allMultilangWpMetaData = {
  type: ['WP_Page!'],
  args: {
    language: 'LanguagesEnum',
    endpoint: 'RestEndpointsEnum!'
  },
  resolve: (_, { endpoint, language }) => wordpressQuery(endpoint, { language: language }).then((res) => res.map((page) => page.yoast_head_json)),
}

module.exports = allMultilangWpMetaData;