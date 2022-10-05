const Content = require("./Content");

const WpPage = `#graphql
    type WpPage {
        id: ID
        date: String
        modified: String
        slug: String
        status: String
        title: Content!
        content: Content!
    }

    ${Content}
`;

module.exports = WpPage;