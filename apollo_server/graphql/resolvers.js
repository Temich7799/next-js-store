require('dotenv').config();

const wooCommerceQuery = require("../services/queries/wooCommerceQuery");
const wordpressQuery = require("../services/queries/wordpressQuery");
const sqlQuery = require("../services/queries/sqlQuery");

const resolvers = {
    Query: {
        allWpPages: (_, { language, filter }) => wordpressQuery('pages', { language: language, filter: filter }),
        allWpPosts: (_, { language, filter }) => wordpressQuery('posts', { language: language, filter: filter }),
        allWpMenuItems: (_, { language, slug, filter }) => wordpressQuery(`menus/v1/menus/${slug}`, { language: language, filter: filter }, ['items'], 'none'),
        allWpWcOrders: () => wooCommerceQuery.get('orders').then((response) => response.data),
        allWpNovaPoshtaCities: (_, { params }) => {

            const cityRow = params.language == 'uk' ? 'description' : 'description_ru';
            const sqlLimit = params.limit == undefined ? '' : ` LIMIT ${params.limit}`;

            return sqlQuery(regExp == undefined
                ? 'SELECT `ref`,`' + cityRow + '` FROM `wp_nova_poshta_city` WHERE 1' + sqlLimit
                : 'SELECT `ref`,`' + cityRow + '` FROM `wp_nova_poshta_city` WHERE LOWER(' + cityRow + `) REGEXP '^` + params.regExp.toLowerCase() + `'` + ' ORDER BY CHAR_LENGTH(' + cityRow + ')' + sqlLimit);
        },
        allWpNovaPoshtaWarehouses: (_, { params }) => {

            const warehouseRow = params.language == 'uk' ? 'description' : 'description_ru';
            const sqlLimit = params.limit == undefined ? '' : ` LIMIT ${lparams.imit}`;
            const regex = params.regExp == undefined ? '' : `) REGEXP '` + params.regExp.toLowerCase();

            return sqlQuery(params.cityRef == undefined
                ? 'SELECT `parent_ref`,`' + warehouseRow + '` FROM `wp_nova_poshta_warehouse` WHERE 1' + sqlLimit
                : 'SELECT `parent_ref`,`' + warehouseRow + '` FROM `wp_nova_poshta_warehouse` WHERE parent_ref = \'' + params.cityRef + '\' AND LOWER(' + warehouseRow + regex + `'` + ' ORDER BY CHAR_LENGTH(' + warehouseRow + ')' + sqlLimit);
        },
        allWcProducts: (_, { params }) => {

            const options = {};
            if (params !== undefined) {
                params.offset && (options.offset = params.offset);
                params.per_page ? options.per_page = params.per_page < 100 ? params.per_page : 100 : options.per_page = 50;
                params.status && (options.status = params.status);
                params.orderby && (options.orderby = params.orderby);
                params.stock_status && (options.stock_status = params.stock_status);
                params.category && (options.category = params.category);
                params.include && (options.include = params.include);
            }

            return wooCommerceQuery.get('products', options)
                .then((response) => response.data)
        },
        allWcProductsCategories: (_, { params }) => {
            const options = {};
            if (params !== undefined) {
                params.hide_empty && (options.hide_empty = params.hide_empty);
                params.product && (options.product = params.product);
                params.slug && (options.slug = params.slug);
            }

            return wooCommerceQuery.get('products/categories', options)
                .then((response) => response.data)
        },
        allWcShippingZonesMethods: (_, { zoneId }) => {
            return wooCommerceQuery.get(`shipping/zones${zoneId !== undefined ? `/${zoneId}/` : '/'}methods`).then((response) => response.data)
        },
        allWcPaymentMethods: () =>

            wooCommerceQuery.get('payment_gateways').then((response) => {
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

        wpWcOrder: (_, { productId }) => wooCommerceQuery.get(`orders/${productId}`).then((response) => response.data),
        wpWcProduct: (_, { productId }) => wooCommerceQuery.get(`products/${productId}`).then((response) => response.data),

    },
    Mutation: {
        wpWcCreateOrder: (_, { data }) => wooCommerceQuery.post("orders", data).then((response) => response.data),
    }
};

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

    wooCommerceQuery.post("products", data)
        .then((response) => {
            console.log('Oka');
        });
}

*/

module.exports = resolvers;