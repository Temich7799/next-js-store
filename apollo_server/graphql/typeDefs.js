const WP_Page = require("./types/wordpress/WP_Page");
const WpNovaPoshtaCity = require("./types/wordpress/WpNovaPoshtaCity");
const WpNovaPoshtaWarehouse = require("./types/wordpress/WpNovaPoshtaWarehouse");
const WP_PageInput = require("./types/wordpress/inputs/WP_PageInput");
const WC_Product = require("./types/woocommerce/types/WC_Product");
const WC_Category = require("./types/woocommerce/types/WC_Category");
const WpWcOrder = require("./types/woocommerce/types/WpWcOrder");
const WC_PaymentMethod = require("./types/woocommerce/types/WC_PaymentMethod");
const WC_ShippingMethod = require("./types/woocommerce/types/WC_ShippingMethod");
const WC_ProductInput = require("./types/woocommerce/inputs/WC_ProductInput");
const OrderDataInput = require("./types/woocommerce/inputs/OrderDataInput");
const WC_ProductCategoryInput = require("./types/woocommerce/inputs/WC_ProductCategoryInput");
const LanguagesEnum = require("./enums/LanguagesEnum");
const PublishStatusesEnum = require("./enums/PublishStatusesEnum");
const StockStatusesEnum = require("./enums/StockStatusesEnum");

const { gql } = require('apollo-server');

const typeDefs = gql`#graphql

    type Query {
        allWpPages(language: LanguagesEnum, filter: WP_PageInput): [WP_Page!]!
        allWpPosts(language: LanguagesEnum, filter: WP_PageInput): [WP_Page!]!
        allWpWcOrders: [WpWcOrder!]! ###########
        allWpNovaPoshtaCities(language: LanguagesEnum, regExp: String, limit: Int): [WpNovaPoshtaCity!]!
        allWpNovaPoshtaWarehouses(language: LanguagesEnum, cityRef: String!, regExp: String, limit: Int): [WpNovaPoshtaWarehouse!]!
        allWcProducts(filter: WC_ProductInput): [WC_Product!]!
        allWcShippingZonesMethods(zoneId: Int): [WC_ShippingMethod!]!
        allWcProductsCategories(filter: WC_ProductCategoryInput): [WC_Category!]! ###########
        allWcPaymentMethods: [WC_PaymentMethod!]!

        wpWcOrder(productId: Int!): WpWcOrder! ###########
        wpWcProduct(productId: Int!): WC_Product! ###########
    }

    type Mutation {
        wpWcCreateOrder(data: OrderDataInput!): WpWcOrder
    }
#############----------Types--------------####################
    ${WP_Page}
    ${WC_Product}
    ${WC_Category}
    ${WpWcOrder}
    ${WpNovaPoshtaCity}
    ${WpNovaPoshtaWarehouse}
    ${WC_PaymentMethod}
    ${WC_ShippingMethod}
#############----------Inputs--------------####################
    ${WC_ProductInput}
    ${OrderDataInput}
    ${WC_ProductCategoryInput}
    ${WP_PageInput}
#############----------Enums--------------####################
    ${LanguagesEnum}
    ${PublishStatusesEnum}
    ${StockStatusesEnum}
`;

module.exports = typeDefs;
