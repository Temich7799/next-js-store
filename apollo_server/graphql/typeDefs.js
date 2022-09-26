const WpWcOrder = require('./types/WpWcOrder');
const WpNovaPoshtaWarehouse = require('./types/WpNovaPoshtaWarehouse');
const WpNovaPoshtaCity = require('./types/WpNovaPoshtaCity');
const WpWcProduct = require('./types/WpWcProduct');
const WpWcCategory = require('./types/WpWcCategory');
const PaymentMethod = require('./types/PaymentMethod');
const WpShippingMethod = require('./types/WpShippingMethod');
const ProductsFilterInput = require('./inputs/ProductsFilterInput');
const OrderDataInput = require('./inputs/OrderDataInput');
const ProductCategoryInput = require('./inputs/ProductCategoryInput');
const LanguagesEnum = require('./enums/LanguagesEnum');
const StockStatusesEnum = require('./enums/StockStatusesEnum');
const PublishStatusesEnum = require('./enums/PublishStatusesEnum');
const { gql } = require('apollo-server');

const typeDefs = gql`#graphql

    type Query {
        allWpWcOrders: [WpWcOrder!]!
        allWpNovaPoshtaCities(language: LanguagesEnum, regExp: String, limit: Int): [WpNovaPoshtaCity!]!
        allWpNovaPoshtaWarehouses(language: LanguagesEnum, cityRef: String!, regExp: String, limit: Int): [WpNovaPoshtaWarehouse!]!
        allWpWcProducts(filter: ProductsFilterInput): [WpWcProduct!]!
        allWpShippingZonesMethods(zoneId: Int): [WpShippingMethod!]!
        allWpWcProductsCategories(filter: ProductCategoryInput): [WpWcCategory!]!
        allWpWcPaymentMethods: [PaymentMethod]

        wpWcOrder(productId: Int!): WpWcOrder!
        wpWcProduct(productId: Int!): WpWcProduct!
    }

    type Mutation {
        wpWcCreateOrder(data: OrderDataInput!): WpWcOrder
    }
#############----------Types--------------####################
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
#############----------Enums--------------####################
    ${LanguagesEnum}
    ${PublishStatusesEnum}
    ${StockStatusesEnum}
`;

module.exports = typeDefs;
