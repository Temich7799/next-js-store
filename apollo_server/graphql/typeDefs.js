const WpPage = require("./types/wordpress/WpPage");
const WpNovaPoshtaCity = require("./types/wordpress/WpNovaPoshtaCity");
const WpNovaPoshtaWarehouse = require("./types/wordpress/WpNovaPoshtaWarehouse");
const WpPageInput = require("./types/wordpress/inputs/WpPageInput");
const WpWcProduct = require("./types/woocommerce/types/WpWcProduct");
const WpWcCategory = require("./types/woocommerce/types/WpWcCategory");
const WpWcOrder = require("./types/woocommerce/types/WpWcOrder");
const PaymentMethod = require("./types/woocommerce/types/PaymentMethod");
const WpShippingMethod = require("./types/woocommerce/types/WpShippingMethod");
const ProductsFilterInput = require("./types/woocommerce/inputs/ProductsFilterInput");
const OrderDataInput = require("./types/woocommerce/inputs/OrderDataInput");
const ProductCategoryInput = require("./types/woocommerce/inputs/ProductCategoryInput");
const LanguagesEnum = require("./enums/LanguagesEnum");
const PublishStatusesEnum = require("./enums/PublishStatusesEnum");
const StockStatusesEnum = require("./enums/StockStatusesEnum");

const { gql } = require('apollo-server');

const typeDefs = gql`#graphql

    type Query {
        allWpPages(language: LanguagesEnum, filter: WpPageInput): [WpPage!]!
        allWpPosts(language: LanguagesEnum, filter: WpPageInput): [WpPage!]!
        allWpWcOrders: [WpWcOrder!]!
        allWpNovaPoshtaCities(language: LanguagesEnum, regExp: String, limit: Int): [WpNovaPoshtaCity!]!
        allWpNovaPoshtaWarehouses(language: LanguagesEnum, cityRef: String!, regExp: String, limit: Int): [WpNovaPoshtaWarehouse!]!
        allWpWcProducts(filter: ProductsFilterInput): [WpWcProduct!]!
        allWpShippingZonesMethods(zoneId: Int): [WpShippingMethod!]!
        allWpWcProductsCategories(filter: ProductCategoryInput): [WpWcCategory!]!
        allWpWcPaymentMethods: [PaymentMethod!]!

        wpWcOrder(productId: Int!): WpWcOrder!
        wpWcProduct(productId: Int!): WpWcProduct!
    }

    type Mutation {
        wpWcCreateOrder(data: OrderDataInput!): WpWcOrder
    }
#############----------Types--------------####################
    ${WpPage}
    ${WpWcProduct}
    ${WpWcCategory}
    ${WpWcOrder}
    ${WpNovaPoshtaCity}
    ${WpNovaPoshtaWarehouse}
    ${PaymentMethod}
    ${WpShippingMethod}
#############----------Inputs--------------####################
    ${ProductsFilterInput}
    ${OrderDataInput}
    ${ProductCategoryInput}
    ${WpPageInput}
#############----------Enums--------------####################
    ${LanguagesEnum}
    ${PublishStatusesEnum}
    ${StockStatusesEnum}
`;

module.exports = typeDefs;
