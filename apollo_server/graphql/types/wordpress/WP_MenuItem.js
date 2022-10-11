const WP_MenuItem = `#graphql
    type WP_MenuItem {
        ID: ID
        slug: String
        url: String
        title: String
        post_name: String
        post_title: String
        post_status: String
        language: String
        child_items: [WP_MenuItem]
    }
`;

module.exports = WP_MenuItem;