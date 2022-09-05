
const express = require('express');
const app = express();
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const port = 3000;

app.use(cors({ origin: true, credentials: true }));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

/*
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

*/