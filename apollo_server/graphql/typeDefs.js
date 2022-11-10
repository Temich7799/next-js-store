const WP_Page = require("./types/wordpress/WP_Page");
const WP_MenuItem = require("./types/wordpress/WP_MenuItem");
const NP_City = require("./types/nova_poshta/NP_City");
const NP_Street = require("./types/nova_poshta/NP_Street");
const NP_Warehouse = require("./types/nova_poshta/NP_Warehouse");
const WP_PageFilter = require("./types/wordpress/inputs/WP_PageFilter");
const WP_PageParams = require("./types/wordpress/inputs/WP_PageParams");
const WC_Product = require("./types/woocommerce/types/WC_Product");
const WC_Category = require("./types/woocommerce/types/WC_Category");
const WpWcOrder = require("./types/woocommerce/types/WpWcOrder");
const WC_PaymentMethod = require("./types/woocommerce/types/WC_PaymentMethod");
const WC_ShippingMethod = require("./types/woocommerce/types/WC_ShippingMethod");
const WC_ProductParams = require("./types/woocommerce/inputs/WC_ProductParams");
const WC_ShippingMethodParams = require("./types/woocommerce/inputs/WC_ShippingMethodParams");
const WC_PaymentMethodParams = require("./types/woocommerce/inputs/WC_PaymentMethodParams");
const OrderDataInput = require("./types/woocommerce/inputs/OrderDataInput");
const WC_ProductCategoryParams = require("./types/woocommerce/inputs/WC_ProductCategoryParams");
const LanguagesEnum = require("./enums/LanguagesEnum");
const PublishStatusesEnum = require("./enums/PublishStatusesEnum");
const RestEndpointsEnum = require("./enums/RestEndpointsEnum");
const StockStatusesEnum = require("./enums/StockStatusesEnum");
const WP_MenuItemFilter = require("./types/wordpress/inputs/WP_MenuItemFilter");
const NP_CityParams = require("./types/nova_poshta/inputs/NP_CityParams");
const NP_StreetParams = require("./types/nova_poshta/inputs/NP_StreetParams");
const NP_WarehouseParams = require("./types/nova_poshta/inputs/NP_WarehouseParams");
const WP_MetaData = require("./types/wordpress/WP_MetaData");

const { gql } = require('apollo-server');

const typeDefs = gql`#graphql

    type Query {
        allWpPages(language: LanguagesEnum, filter: WP_PageFilter, params: WP_PageParams): [WP_Page!]!
        allWpPosts(language: LanguagesEnum, filter: WP_PageFilter, params: WP_PageParams): [WP_Page!]!
        allWpMenuItems(slug: String!, language: LanguagesEnum, filter: WP_MenuItemFilter, params: WP_PageParams): [WP_MenuItem!]!
        allWpWcOrders: [WpWcOrder!]! ###########
        allNovaPoshtaCities(params: NP_CityParams): [NP_City]!
        allNovaPoshtaStreets(params: NP_StreetParams): [NP_Street]!
        allNovaPoshtaWarehouses(params: NP_WarehouseParams): [NP_Warehouse]!
        allWcProducts(params: WC_ProductParams): [WC_Product!]!
        allWcProductsCategories(params: WC_ProductCategoryParams): [WC_Category!]! ###########
        allWcShippingZonesMethods(zoneId: Int, language: LanguagesEnum, params: WC_ShippingMethodParams): [WC_ShippingMethod!]!
        allWcPaymentMethods(language: LanguagesEnum, params: WC_PaymentMethodParams): [WC_PaymentMethod!]!
        allWpMetaData(endpoint: RestEndpointsEnum!, language: LanguagesEnum, params: WP_PageParams): [WP_MetaData!]!

        wpPage(pageId: Int!, language: LanguagesEnum): WP_Page!
        wpPost(postId: Int!, language: LanguagesEnum): WP_Page!
        wpWcOrder(productId: Int!): WpWcOrder! ###########
        wpWcProduct(productId: Int!, language: LanguagesEnum): WC_Product! ###########
        wpMetaData(endpoint: RestEndpointsEnum!, pageId: Int!, language: LanguagesEnum): WP_MetaData!
    }

    type Mutation {
        wpWcCreateOrder(data: OrderDataInput!): WpWcOrder
    }
#############----------Types--------------####################
    ${WP_Page}
    ${WC_Product}
    ${WP_MenuItem}
    ${WC_Category}
    ${WpWcOrder}
    ${NP_City}
    ${NP_Street}
    ${NP_Warehouse}
    ${WC_PaymentMethod}
    ${WC_ShippingMethod}
    ${WP_MetaData}
#############----------Inputs--------------####################
    ${WP_PageParams}
    ${WC_ProductParams}
    ${OrderDataInput}
    ${WC_ProductCategoryParams}
    ${WP_PageFilter}
    ${WP_MenuItemFilter}
    ${NP_CityParams}
    ${NP_StreetParams}
    ${NP_WarehouseParams}
    ${WC_PaymentMethodParams}
    ${WC_ShippingMethodParams}
#############----------Enums--------------####################
    ${LanguagesEnum}
    ${PublishStatusesEnum}
    ${StockStatusesEnum}
    ${RestEndpointsEnum}
`;

module.exports = typeDefs;
