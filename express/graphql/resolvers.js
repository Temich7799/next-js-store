const mysql = require('mysql');
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    database: 'nines_dolls',
    user: 'root',
    password: 'root'
});

const WooCommerce = new WooCommerceRestApi({
    url: 'http://localhost:8888/wordpress',
    consumerKey: 'ck_0db198da88b1a81b2e7766af5126771190b31b96',
    consumerSecret: 'cs_601709c4babde4702e285a2f972dad154f2021c7',
    version: 'wc/v3'
});

const resolvers = {
    allWpNovaPoshtaCities: ({ language, regExp, limit }) => {

        const cityRow = language == 'UA' ? 'description' : 'description_ru';
        const sqlLimit = limit == undefined ? '' : ` LIMIT ${limit}`;

        return sqlQuery(regExp == undefined
            ? 'SELECT `ref`,`' + cityRow + '` FROM `wp_nova_poshta_city` WHERE 1' + sqlLimit
            : 'SELECT `ref`,`' + cityRow + '` FROM `wp_nova_poshta_city` WHERE LOWER(' + cityRow + `) REGEXP '^` + regExp.toLowerCase() + `'` + ' ORDER BY CHAR_LENGTH(' + cityRow + ')' + sqlLimit);
    },
    allWpNovaPoshtaWarehouses: ({ language, cityRef, regExp, limit }) => {

        const warehouseRow = language == 'UA' ? 'description' : 'description_ru';
        const sqlLimit = limit == undefined ? '' : ` LIMIT ${limit}`;
        const regex = regExp == undefined ? '' : `) REGEXP '` + regExp.toLowerCase();

        return sqlQuery(cityRef == undefined
            ? 'SELECT `parent_ref`,`' + warehouseRow + '` FROM `wp_nova_poshta_warehouse` WHERE 1' + sqlLimit
            : 'SELECT `parent_ref`,`' + warehouseRow + '` FROM `wp_nova_poshta_warehouse` WHERE parent_ref = \'' + cityRef + '\' AND LOWER(' + warehouseRow + regex + `'` + ' ORDER BY CHAR_LENGTH(' + warehouseRow + ')' + sqlLimit);
    },
    allWpWcOrders: () => WooCommerce.get('orders').then((response) => response.data),
    allWpWcProducts: ({ filter }) => {

        const options = {
            offset: filter.offset ? filter.offset : 0,
            per_page: filter.per_page ? filter.per_page : 10,
            status: filter.status ? filter.status : 'any',
        };

        filter.orderby && (options.orderby = filter.orderby);
        filter.stock_status && (options.stock_status = filter.stock_status);
        filter.category && (options.category = filter.category);

        return WooCommerce.get('products', options)
            .then((response) => response.data)
    },
    allWpWcPaymentMethods: () =>

        WooCommerce.get('payment_gateways').then((response) => {
            const result = [];

            response.data.forEach((paymentMethod) => {
                if (paymentMethod.settings.enable_for_methods) {
                    paymentMethod.enable_for_methods = [];

                    Object.entries(paymentMethod.settings.enable_for_methods.options).forEach(enableMethods => {

                        Object.entries(enableMethods[1]).forEach(method => {
                            method.forEach(name => { paymentMethod.enable_for_methods.push(name) })
                        })
                    }
                    );
                    result.push(paymentMethod);
                }

                else {
                    result.push(paymentMethod);
                }
            })

            return result;
        }),
    wpWcOrder: ({ id }) => WooCommerce.get(`orders/${id}`).then((response) => response.data),
    wpWcProduct: ({ id }) => WooCommerce.get(`products/${id}`).then((response) => response.data),

};

function sqlQuery(sql) {
    return new Promise(resolve => {
        //connection.connect();
        connection.query(sql, (err, responce) => (responce !== undefined) && resolve(responce));
        //connection.end();
    })
}

module.exports = resolvers;