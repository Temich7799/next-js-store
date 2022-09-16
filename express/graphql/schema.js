const { buildSchema } = require('graphql');
const WpWcOrder = require('./types/WpWcOrder');
const WpNovaPoshtaWarehouse = require('./types/WpNovaPoshtaWarehouse');
const WpNovaPoshtaCity = require('./types/WpNovaPoshtaCity');
const WpWcProduct = require('./types/WpWcProduct');
const PaymentMethod = require('./types/PaymentMethod');
const ProductsFilterInput = require('./inputs/ProductsFilterInput');
const OrderDataInput = require('./inputs/OrderDataInput');
const LanguagesEnum = require('./enums/LanguagesEnum');
const StockStatusesEnum = require('./enums/StockStatusesEnum');
const PublishStatusesEnum = require('./enums/PublishStatusesEnum');

const schema = buildSchema(`#graphql

    type Query {
        allWpWcOrders: [WpWcOrder!]!
        allWpNovaPoshtaCities(language: LanguagesEnum, regExp: String, limit: Int): [WpNovaPoshtaCity!]!
        allWpNovaPoshtaWarehouses(language: LanguagesEnum, cityRef: String!, regExp: String, limit: Int): [WpNovaPoshtaWarehouse!]!
        allWpWcProducts(filter: ProductsFilterInput): [WpWcProduct!]!
        allWpWcPaymentMethods: [PaymentMethod]

        wpWcOrder(productId: Int!): WpWcOrder!
        wpWcProduct(productId: Int!): WpWcProduct!
    }

    type Mutation {
        wpWcCreateOrder(data: OrderDataInput!): WpWcOrder
    }
#############----------Types--------------####################
    ${WpWcProduct}
    ${WpWcOrder}
    ${WpNovaPoshtaCity}
    ${WpNovaPoshtaWarehouse}
    ${PaymentMethod}
#############----------Inputs--------------####################
    ${ProductsFilterInput}
    ${OrderDataInput}
#############----------Enums--------------####################
    ${LanguagesEnum}
    ${PublishStatusesEnum}
    ${StockStatusesEnum}
`);

module.exports = schema;
