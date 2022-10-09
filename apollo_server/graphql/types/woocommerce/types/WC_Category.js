const WC_Category = `#graphql

    type WC_Category {
        id: ID!
        name: String
        slug: String
        description: String
        menu_order: Int
        image: CategoryImage
        language: String
    }

    type CategoryImage {
        alt: String
        src: String
    }
`;

module.exports = WC_Category;