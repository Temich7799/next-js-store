const PublishStatusesEnum = require("../../../enums/PublishStatusesEnum");

const WP_PageInput = `#graphql
    input WP_PageInput {
        status: PublishStatusesEnum
    }

    ${PublishStatusesEnum}
`;

module.exports = WP_PageInput;