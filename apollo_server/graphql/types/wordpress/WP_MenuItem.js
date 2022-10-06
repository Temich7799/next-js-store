const WP_MenuItem = `#graphql
    type WP_MenuItem {
        ID: ID
        slug: String
        url: String
        post_name: String
        post_status: String
        child_items: [WP_MenuItem]
    }
`;

module.exports = WP_MenuItem;