const WpWcCategory = `#graphql

    type WpWcCategory {
        id: ID!
        name: String
        slug: String
        description: String
        menu_order: Int
        image: CategoryImage
    }

    type CategoryImage {
        alt: String
        src: String
    }
`;

module.exports = WpWcCategory;