const mysql = require('mysql');
require('dotenv').config();
const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    port: process.env.SQL_PORT,
    database: process.env.SQL_DB,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS
});

const WooCommerce = new WooCommerceRestApi({
    url: process.env.WC_URL,
    consumerKey: process.env.WC_KEY,
    consumerSecret: process.env.WC_SECRET,
    version: process.env.WC_VERSION
});

const resolvers = {
    Query: {
        allWpNovaPoshtaCities: (_, { language, regExp, limit }) => {

            const cityRow = language == 'UA' ? 'description' : 'description_ru';
            const sqlLimit = limit == undefined ? '' : ` LIMIT ${limit}`;

            return sqlQuery(regExp == undefined
                ? 'SELECT `ref`,`' + cityRow + '` FROM `wp_nova_poshta_city` WHERE 1' + sqlLimit
                : 'SELECT `ref`,`' + cityRow + '` FROM `wp_nova_poshta_city` WHERE LOWER(' + cityRow + `) REGEXP '^` + regExp.toLowerCase() + `'` + ' ORDER BY CHAR_LENGTH(' + cityRow + ')' + sqlLimit);
        },
        allWpNovaPoshtaWarehouses: (_, { language, cityRef, regExp, limit }) => {

            const warehouseRow = language == 'UA' ? 'description' : 'description_ru';
            const sqlLimit = limit == undefined ? '' : ` LIMIT ${limit}`;
            const regex = regExp == undefined ? '' : `) REGEXP '` + regExp.toLowerCase();

            return sqlQuery(cityRef == undefined
                ? 'SELECT `parent_ref`,`' + warehouseRow + '` FROM `wp_nova_poshta_warehouse` WHERE 1' + sqlLimit
                : 'SELECT `parent_ref`,`' + warehouseRow + '` FROM `wp_nova_poshta_warehouse` WHERE parent_ref = \'' + cityRef + '\' AND LOWER(' + warehouseRow + regex + `'` + ' ORDER BY CHAR_LENGTH(' + warehouseRow + ')' + sqlLimit);
        },
        allWpWcOrders: () => WooCommerce.get('orders').then((response) => response.data),
        allWpWcProducts: (_, { filter }) => {

            const options = {};
            if (filter !== undefined) {
                filter.offset && (options.offset = filter.offset);
                filter.per_page ? options.per_page = filter.per_page < 100 ? filter.per_page : 100 : options.per_page = 50;
                filter.status && (options.status = filter.status);
                filter.orderby && (options.orderby = filter.orderby);
                filter.stock_status && (options.stock_status = filter.stock_status);
                filter.category && (options.category = filter.category);
                filter.include && (options.include = filter.include);
            }

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
        wpWcOrder: (_, { productId }) => WooCommerce.get(`orders/${productId}`).then((response) => response.data),
        wpWcProduct: (_, { productId }) => WooCommerce.get(`products/${productId}`).then((response) => response.data),

    },
    Mutation: {
        wpWcCreateOrder: (_, { data }) => WooCommerce.post("orders", data).then((response) => response.data),
    }
};

function sqlQuery(sql) {
    return new Promise(resolve => {
        //connection.connect();
        connection.query(sql, (err, responce) => (responce !== undefined) && resolve(responce));
        //connection.end();
    })
}
/*
const images = ["https://localhost:8888/wordpress/wp-content/uploads/2022/09/3954484832_w280_h280_pups-vanilnij-nines.png", "https://localhost:8888/wordpress/wp-content/uploads/2022/09/3954469445_w280_h280_pups-vanilnij-nines.png", "https://localhost:8888/wordpress/wp-content/uploads/2022/09/3953920415_w280_h280_pups-vanilnij-nines.png", "https://localhost:8888/wordpress/wp-content/uploads/2022/09/3953062012_w280_h280_pups-vanilnij-nines.png", "https://localhost:8888/wordpress/wp-content/uploads/2022/09/3948023537_w280_h280_pups-vanilnij-nines.png", "https://localhost:8888/wordpress/wp-content/uploads/2022/09/3948020525_w280_h280_pups-vanilnij-nines.png", "https://localhost:8888/wordpress/wp-content/uploads/2022/09/3948013401_w280_h280_pups-vanilnij-nines.png", "https://localhost:8888/wordpress/wp-content/uploads/2022/09/3947996278_w280_h280_pups-vanilnij-nines.png", "https://localhost:8888/wordpress/wp-content/uploads/2022/09/3946729172_w280_h280_pups-vanilnij-nines.png", "https://localhost:8888/wordpress/wp-content/uploads/2022/09/3946725166_w280_h280_pups-vanilnij-nines.png"];
const names = ["Испанский пупс Nines d Onil с запахом ванили 26 см", "Ванильный пупс 23 см Nines d Onil", "Испанская кукла Nines d Onil, ванильный пупс с волосами"]
for (let i = 0; i < 50; i++) {
    const data = {
        name: names[Math.floor(Math.random() * names.length)],
        type: "simple",
        price: (Math.floor(Math.random() * (705 - 555) + 555)).toString,
        description: "Пупсы Nines d Onil — новые популярные игрушки известного испанского бренда. <ul> <li>Материал: высококачественный бархатистый винил с ароматом ванили.</li> <li>Размер куклы: 26 см.</li> <li>Страна производства: Испания</li> </ul> <strong>Возможности:</strong> <ul> <li>Куколка со вкусом ванили.</li> <li>Включает в себя: всю одежду, показанную на фото (вся снята)</li> </ul> <em>Куколка с трогательным выражением лица — новинка от фабрики Nines d Onil. Куклы в наличии на складе интернет-магазина Потапович в Харькове.</em> <em>Доступный самовывоз ТЦ Континент</em> <em>Куколки поставляются в фирменной подарочной упаковке.</em> <em>Кукла Vanilla полностью изготовлена ​​из бархатного винила и имеет приятный запах ванили.</em> <strong>Руки, ноги и голова подвижны</strong> <em>Кукла является 100% оригинальным продуктом испанской фабрики Nines D Onil, имеет фирменное клеймо на спине и бирку на одежде.</em> <strong>Куколку можно купать! Аромат ванили никуда не делся!</strong>",
        short_description: "Детские куклы Nines d Onil – это новые популярные игрушки известного Испанского бренда. С такой модницей приятно играть девочке всех возрастов. Пупс станет отличным подарком не только для детей, но и для любителей коллекционных кукол, которые по достоинству ценят качество и индивидуальность игрушки!",
        categories: [
            {
                id: 94
            }
        ],
        images: [
            {
                src: images[Math.floor(Math.random() * images.length)]
            },
            {
                src: images[Math.floor(Math.random() * images.length)]
            }
        ]
    };

    WooCommerce.post("products", data)
        .then((response) => {
            console.log('Oka');
        });
}

*/

module.exports = resolvers;