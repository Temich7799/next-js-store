const WP_MetaData = require("../../wordpress/WP_MetaData");

const WC_Category = `#graphql

    type WC_Category {
        id: ID!
        name: String
        slug: String
        description: String
        menu_order: Int
        image: CategoryImage
        yoast_head_json: WP_MetaData
    }

    type CategoryImage {
        alt: String
        src: String
    }

    ${WP_MetaData}
`;

module.exports = WC_Category;