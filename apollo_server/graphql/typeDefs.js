const WP_Page = require("./types/wordpress/WP_Page");
const WpNovaPoshtaCity = require("./types/wordpress/WpNovaPoshtaCity");
const WpNovaPoshtaWarehouse = require("./types/wordpress/WpNovaPoshtaWarehouse");
const WP_PageInput = require("./types/wordpress/inputs/WP_PageInput");
const WpWcProduct = require("./types/woocommerce/types/WpWcProduct");
const WpWcCategory = require("./types/woocommerce/types/WpWcCategory");
const WpWcOrder = require("./types/woocommerce/types/WpWcOrder");
const WC_PaymentMethod = require("./types/woocommerce/types/WC_PaymentMethod");
const WC_ShippingMethod = require("./types/woocommerce/types/WC_ShippingMethod");
const ProductsFilterInput = require("./types/woocommerce/inputs/ProductsFilterInput");
const OrderDataInput = require("./types/woocommerce/inputs/OrderDataInput");
const ProductCategoryInput = require("./types/woocommerce/inputs/ProductCategoryInput");
const LanguagesEnum = require("./enums/LanguagesEnum");
const PublishStatusesEnum = require("./enums/PublishStatusesEnum");
const StockStatusesEnum = require("./enums/StockStatusesEnum");

const { gql } = require('apollo-server');

const typeDefs = gql`#graphql

    type Query {
        wp_allPages(language: LanguagesEnum, filter: WP_PageInput): [WP_Page!]!
        wp_allPosts(language: LanguagesEnum, filter: WP_PageInput): [WP_Page!]!
        allWpWcOrders: [WpWcOrder!]! ###########
        allWpNovaPoshtaCities(language: LanguagesEnum, regExp: String, limit: Int): [WpNovaPoshtaCity!]!
        allWpNovaPoshtaWarehouses(language: LanguagesEnum, cityRef: String!, regExp: String, limit: Int): [WpNovaPoshtaWarehouse!]!
        allWpWcProducts(filter: ProductsFilterInput): [WpWcProduct!]!
        wc_allShippingZonesMethods(zoneId: Int): [WC_ShippingMethod!]!
        allWpWcProductsCategories(filter: ProductCategoryInput): [WpWcCategory!]! ###########
        wc_allPaymentMethods: [WC_PaymentMethod!]!

        wpWcOrder(productId: Int!): WpWcOrder! ###########
        wpWcProduct(productId: Int!): WpWcProduct! ###########
    }

    type Mutation {
        wpWcCreateOrder(data: OrderDataInput!): WpWcOrder
    }
#############----------Types--------------####################
    ${WP_Page}
    ${WpWcProduct}
    ${WpWcCategory}
    ${WpWcOrder}
    ${WpNovaPoshtaCity}
    ${WpNovaPoshtaWarehouse}
    ${WC_PaymentMethod}
    ${WC_ShippingMethod}
#############----------Inputs--------------####################
    ${ProductsFilterInput}
    ${OrderDataInput}
    ${ProductCategoryInput}
    ${WP_PageInput}
#############----------Enums--------------####################
    ${LanguagesEnum}
    ${PublishStatusesEnum}
    ${StockStatusesEnum}
`;

module.exports = typeDefs;
