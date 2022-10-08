const PublishStatusesEnum = require("../../../enums/PublishStatusesEnum");

const WP_PageFilter = `#graphql

    input WP_PageFilter {
        exclude: WP_PageInputFilter
        include: WP_PageInputFilter
    }

    input WP_PageInputFilter {
        id: [ID]
        status: [PublishStatusesEnum]
        date: [String]
        modified: [String]
        slug: [String]
        title: ContentInput
    }

    input ContentInput {
        rendered: [String!]
        protected: [Boolean]
    }

    ${PublishStatusesEnum}
`;

module.exports = WP_PageFilter;