const path = require(`path`);

exports.createSchemaCustomization = ({ actions }) => {

  const { createTypes } = actions;

  const WP_Page = require("./apollo_server/graphql/types/wordpress/WP_Page");
  const WP_PageInput = require("./apollo_server/graphql/types/wordpress/inputs/WP_PageInput");
  const WC_ShippingMethod = require("./apollo_server/graphql/types/woocommerce/types/WC_ShippingMethod");
  const WC_PaymentMethod = require("./apollo_server/graphql/types/woocommerce/types/WC_PaymentMethod");
  const WC_Product = require("./apollo_server/graphql/types/woocommerce/types/WC_Product");
  const WC_ProductInput = require("./apollo_server/graphql/types/woocommerce/inputs/WC_ProductInput");
  const WC_Category = require("./apollo_server/graphql/types/woocommerce/types/WC_Category");
  const WC_ProductCategoryInput = require("./apollo_server/graphql/types/woocommerce/inputs/WC_ProductCategoryInput");
  const LanguagesEnum = require('./apollo_server/graphql/enums/LanguagesEnum')
  const StockStatusesEnum = require('./apollo_server/graphql/enums/StockStatusesEnum')

  createTypes(`
    ${WP_Page}
    ${WP_PageInput}
    ${WC_ShippingMethod}
    ${WC_PaymentMethod}
    ${WC_Product}
    ${WC_ProductInput}
    ${WC_Category}
    ${WC_ProductCategoryInput}
    ${LanguagesEnum}
    ${StockStatusesEnum}
  `);
}

exports.createResolvers = ({ createResolvers }) => {

  const fetch = require('cross-fetch');
  const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;

  createResolvers({

    Query: {
      allMultilangWpPages: {
        type: ['WP_Page!'],
        args: {
          language: 'LanguagesEnum',
          filter: 'WP_PageInput'
        },
        resolve: (_, { language, filter }) => wordpressQuery('pages', { language: language, filter: filter })
      },
      allMultilangWpPosts: {
        type: ['WP_Page!'],
        args: {
          language: 'LanguagesEnum',
          filter: 'WP_PageInput'
        },
        resolve: (_, { language, filter }) => wordpressQuery('posts', { language: language, filter: filter })
      },
      allMultilangWcShippingMethods: {
        type: ['WC_ShippingMethod!'],
        args: {
          zoneId: 'Int!',
          language: 'LanguagesEnum',
        },
        resolve: (_, { zoneId, language }) => WooCommerceQuery(language).get(`shipping/zones${zoneId !== undefined ? `/${zoneId}/` : '/'}methods`).then((response) => response.data)
      },
      allMultilangWcPaymentMethods: {
        type: ['WC_PaymentMethod!'],
        args: {
          language: 'LanguagesEnum',
        },
        resolve: (_, { language }) => WooCommerceQuery(language).get('payment_gateways').then((response) => {

          const result = [];

          response.data.forEach((WC_PaymentMethod) => {
            if (WC_PaymentMethod.settings.enable_for_methods) {
              WC_PaymentMethod.enable_for_methods = [];

              Object.entries(WC_PaymentMethod.settings.enable_for_methods.options).forEach(enableMethods => {

                Object.entries(enableMethods[1]).forEach(method => {
                  method.forEach(name => { WC_PaymentMethod.enable_for_methods.push(name) })
                })
              }
              );
              result.push(WC_PaymentMethod);
            }

            else {
              result.push(WC_PaymentMethod);
            }
          })

          return result;
        })
      },
      allMultilangWcProducts: {
        type: ['WC_Product!'],
        args: {
          filter: 'WC_ProductInput',
          language: 'LanguagesEnum',
        },
        resolve: (_, { filter, language }) => {

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

          return WooCommerceQuery(language).get('products', options)
            .then((response) => response.data)
        }
      },
      allMultilangWcCategories: {
        type: ['WC_Category!'],
        args: {
          filter: 'WC_ProductCategoryInput',
          language: 'LanguagesEnum',
        },
        resolve: (_, { filter, language }) => {

          const options = {};
          if (filter !== undefined) {
            filter.hide_empty && (options.hide_empty = filter.hide_empty);
            filter.product && (options.product = filter.product);
            filter.slug && (options.slug = filter.slug);
          }

          return WooCommerceQuery(language).get('products/categories', options)
            .then((response) => response.data)
        }
      },
    }
  });

  function WooCommerceQuery(languagePrefix) {
    return new WooCommerceRestApi({
      url: `${process.env.GASTBY_WP_URL}${languagePrefix ? `/${languagePrefix}` : ''}`,
      consumerKey: process.env.GATSBY_WC_KEY,
      consumerSecret: process.env.GATSBY_WC_SECRET,
      version: process.env.GATSBY_WC_VERSION
    });
  }

  function wordpressQuery(endpoint, options) {

    const { language, filter } = options;

    return fetch(`${process.env.GASTBY_WP_URL}/${language ? `${language}/` : '/'}wp-json/wp/v2/${endpoint}`)
      .then(response => response.json())
      .then(data => {

        if (filter !== undefined) {

          const result = [];
          const ignoreIndexes = new Set();

          Object.keys(filter).forEach(key => {

            data.forEach((object, index) => {
              if (object[key] && object[key] !== filter[key]) {
                ignoreIndexes.add(index);
              }
            });
          });

          data.forEach((object, index) => {
            if (!ignoreIndexes.has(index)) result.push(object);
          });

          return result
        }

        else return data;
      });
  }
}


exports.createPages = async function ({ actions, graphql }) {

  async () => {
    ///---------------------------------Make Pages
    const { data } = await graphql(`
      query getPages {
        allWpPage(filter: {status: {eq: "publish"}}) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);

    data.allWpPage.edges.forEach((edge) => {
      if (edge.node.slug !== 'catalog' && edge.node.slug !== 'home') {
        actions.createPage({
          path: edge.node.slug,
          component: path.resolve(`./src/components/Layouts/pages/PageLayout.tsx`),
          context: { slug: edge.node.slug },
        })
      }
    })
  }

  async () => {
    ///---------------------------------Make Products Pages
    const { data } = await graphql(`
      query getCategories {
        allWcProductsCategories {
          edges {
            node {
              wordpress_id
              slug
            }
          }
        }
      }
    `);

    data.allWcProductsCategories.edges.forEach((edge) => {
      actions.createPage({
        path: `catalog/${edge.node.slug}`,
        component: path.resolve(`./src/components/Layouts/pages/ProductsLayout.tsx`),
        context: { categoryId: edge.node.wordpress_id },
      })
    })
  }

  async () => {
    ///---------------------------------Make Product Pages
    const { data } = await graphql(`
      query getProducts {
        allWcProducts(filter: {stock_status: {eq: "instock"}, status: {eq: "publish"}}) {
          edges {
            node {
              sku
              wordpress_id         
              categories {
                slug
              }
            }
          }
        }
      }
    `);

    data.allWcProducts.edges.forEach((edge) => {

      if (edge.node.sku == '') edge.node.sku = edge.node.wordpress_id;

      actions.createPage({
        path: `catalog/${edge.node.categories[0].slug}/${edge.node.categories[0].slug}-${edge.node.sku}`,
        component: path.resolve(`./src/components/Layouts/pages/ProductLayout.tsx`),
        context: { productId: edge.node.wordpress_id },
      })
    })
  }
}