const Content = require("./Content");
const WP_MetaData = require("./WP_MetaData");

const WP_Page = `#graphql
    type WP_Page {
        id: ID
        date: String
        modified: String
        slug: String
        status: String
        title: Content!
        content: Content!
        yoast_head_json: WP_MetaData
    }

    ${Content}
    ${WP_MetaData}
`;

module.exports = WP_Page;