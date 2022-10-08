const PublishStatusesEnum = require("../../../enums/PublishStatusesEnum");

const WP_MenuItemFilter = `#graphql

    input WP_MenuItemFilter {
        exclude: WP_MenuItemInputFilter
        include: WP_MenuItemInputFilter
    }

    input WP_MenuItemInputFilter {
        ID: [ID]
        slug: [String]
        url: [String]
        post_name: [String]
        post_status: [String]
    }

    ${PublishStatusesEnum}
`;

module.exports = WP_MenuItemFilter;