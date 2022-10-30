const Content = require("./Content");

const WP_Page = `#graphql
    type WP_Page {
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

module.exports = WP_Page;