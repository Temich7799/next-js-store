const typeDefs = `
    ${require("../apollo_server/graphql/types/wordpress/WP_Page")}
    ${require("../apollo_server/graphql/types/wordpress/WP_MetaData")}
    ${require("../apollo_server/graphql/types/wordpress/inputs/WP_PageFilter")}
    ${require("../apollo_server/graphql/types/wordpress/WP_MenuItem")}
    ${require("../apollo_server/graphql/types/wordpress/inputs/WP_MenuItemFilter")}
    ${require("../apollo_server/graphql/types/woocommerce/types/WC_ShippingMethod")}
    ${require("../apollo_server/graphql/types/woocommerce/types/WC_PaymentMethod")}
    ${require("../apollo_server/graphql/types/woocommerce/types/WC_Product")}
    ${require("../apollo_server/graphql/types/woocommerce/inputs/WC_PaymentMethodParams")}
    ${require("../apollo_server/graphql/types/woocommerce/inputs/WC_ShippingMethodParams")}
    ${require("../apollo_server/graphql/types/woocommerce/inputs/WC_ProductParams")}
    ${require("../apollo_server/graphql/types/woocommerce/types/WC_Category")}
    ${require("../apollo_server/graphql/types/woocommerce/inputs/WC_ProductCategoryParams")}
    ${require('../apollo_server/graphql/enums/LanguagesEnum')}
    ${require('../apollo_server/graphql/enums/StockStatusesEnum')}
    ${require('../apollo_server/graphql/enums/RestEndpointsEnum')}
`

module.exports = typeDefs;