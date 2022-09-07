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

    allWpNovaPoshtaCities: () => makeSqlQuery('SELECT `ref`,`description`,`description_ru` FROM `wp_nova_poshta_city` WHERE 1'),
    allWpNovaPoshtaWarehouses: () => makeSqlQuery('SELECT `parent_ref`,`description`,`description_ru` FROM `wp_nova_poshta_warehouse` WHERE 1'),
    allWpWcOrders: () => WooCommerce.get('orders').then((response) => response.data),
    allWpWcProducts: () => WooCommerce.get('products').then((response) => response.data),

    wpWcProduct: ({ id }) => WooCommerce.get(`products/${id}`).then((response) => response.data)

};

function makeSqlQuery(sql) {
    return new Promise(resolve => {
        //connection.connect();
        connection.query(sql, (err, responce) => (responce !== undefined) && resolve(responce));
        //connection.end();
    })
}

module.exports = resolvers;