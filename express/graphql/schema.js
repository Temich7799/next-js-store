const { buildSchema } = require('graphql');
const ShippingLine = require('./types/ShippingLine');
const WpWcOrderedProduct = require('./types/WpWcOrderedProduct');
const WpWcCustomer = require('./types/WpWcCustomer');
const WpWcOrder = require('./types/WpWcOrder');
const WpNovaPoshtaWarehouse = require('./types/WpNovaPoshtaWarehouse');
const WpNovaPoshtaCity = require('./types/WpNovaPoshtaCity');
const WpWcProduct = require('./types/WpWcProduct');
const PaymentMethod = require('./types/PaymentMethod');

const schema = buildSchema(`#graphql

    type Query {
        allWpWcOrders: [WpWcOrder!]!
        allWpNovaPoshtaCities(language: Languages, regExp: String, limit: Int): [WpNovaPoshtaCity!]!
        allWpNovaPoshtaWarehouses(language: Languages, cityRef: String!, regExp: String, limit: Int): [WpNovaPoshtaWarehouse!]!
        allWpWcProducts: [WpWcProduct!]!
        allWpWcPaymentMethods: [PaymentMethod]

        wpWcOrder(id: Int!): WpWcOrder!
        wpWcProduct(id: Int!): WpWcProduct!
    }

    enum Languages {
        RU
        UA
    }

    ${WpWcProduct}
    ${ShippingLine}
    ${WpWcOrderedProduct}
    ${WpWcCustomer}
    ${WpWcOrder}
    ${WpNovaPoshtaCity}
    ${WpNovaPoshtaWarehouse}
    ${PaymentMethod}
`);

module.exports = schema;
