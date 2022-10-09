const wordpressQuery = require('../../../services/queries/wordpressQuery');

const multilangWpPost = {
  type: 'WP_Page!',
  args: {
    language: 'LanguagesEnum',
    postId: 'Int!'
  },
  resolve: (_, { language, postId }) => wordpressQuery(`posts/${postId}`, { language: language })
}

module.exports = multilangWpPost;