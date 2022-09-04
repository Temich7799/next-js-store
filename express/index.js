
const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const forms = multer();
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
const mysql = require('mysql');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    database: 'nines_dolls',
    user: 'root',
    password: 'root'
});

const schema = buildSchema(`
    type WpCity {
        ref: String
        description: String
        description_ru: String
    }
    type Query {
        allCities: [WpCity]
    }
`);

const root = {
    allCities: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT `ref`,`description`,`description_ru` FROM `wp_nova_poshta_city` WHERE 1", (err, rows) =>
                (rows !== undefined) && resolve(rows)
            );
        });
    },
};

app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

const WooCommerce = new WooCommerceRestApi({
    url: 'http://localhost:8888/wordpress',
    consumerKey: 'ck_0db198da88b1a81b2e7766af5126771190b31b96',
    consumerSecret: 'cs_601709c4babde4702e285a2f972dad154f2021c7',
    version: 'wc/v3'
});

router.post('/orders', (request, res) => {

    request.body.shipping = JSON.parse(request.body.shipping);
    request.body.billing = request.body.shipping;
    request.body.line_items = JSON.parse(request.body.line_items);
    request.body.shipping_lines = JSON.parse(request.body.shipping_lines);

    WooCommerce.post('orders', request.body)
        .then((response) => {
            res.json(response.data);
        })
});

function makeQuery(sql, res, callback) {
    //connection.connect();
    connection.query(sql, (err, responce) => {
        if (err) throw err;
        res.send(responce);
        callback && callback(responce);
    });
    //connection.end();
}

function formatResponce(data) {
    return data.map((dataKey) => Object.values(dataKey)[0]);
}

app.get('/', (req, res) => {
    makeQuery('SELECT `ref`,`description`,`description_ru` FROM `wp_nova_poshta_city` WHERE 1', res, console.log)
});

app.get('/cities', (req, res) => {

    const getCitiesQuery = (rowName, tableName) => 'SELECT ' + rowName + ' FROM ' + tableName + ' WHERE LOWER(' + rowName + `) REGEXP '` + req.query.city.toLowerCase() + `'` + ' ORDER BY CHAR_LENGTH(' + rowName + ') ASC';

    req.query.shippingZoneMethod == 'justin_shipping_method' && makeQuery(getCitiesQuery('descr', 'wp_woo_justin_ru_cities'), res);
    req.query.shippingZoneMethod == 'nova_poshta_shipping_method' && makeQuery(getCitiesQuery('description_ru', 'wp_nova_poshta_city'), res);

});

app.get('/warehouses', (req, res) => {

    const cityRefQuery = (cityName, cityRowName, tableName, refRowName) => 'SELECT ' + refRowName + ' FROM ' + tableName + ' WHERE ' + cityRowName + ` = '` + cityName + `'`;
    const warehousesQuery = (cityRef, refRowName, warehouseRowName, tableName) => 'SELECT ' + warehouseRowName + ' FROM ' + tableName + ' WHERE ' + refRowName + ' = (' + cityRef + ')';

    req.query.shippingZoneMethod == 'justin_shipping_method' && makeQuery(warehousesQuery(
        cityRefQuery(req.query.city, 'descr', 'wp_woo_justin_ru_cities', 'uuid'), 'city_uuid', 'descr', 'wp_woo_justin_ru_warehouses'), res);

    req.query.shippingZoneMethod == 'nova_poshta_shipping_method' && makeQuery(warehousesQuery(
        cityRefQuery(req.query.city, 'description_ru', 'wp_nova_poshta_city', 'ref'), 'parent_ref', 'description_ru', 'wp_nova_poshta_warehouse'), res);

});