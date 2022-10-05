const path = require(`path`);
const fetch = require('cross-fetch');

exports.createSchemaCustomization = ({ actions }) => {

  const { createTypes } = actions;

  const WP_Page = require("./apollo_server/graphql/types/wordpress/WP_Page");
  const WP_PageInput = require("./apollo_server/graphql/types/wordpress/inputs/WP_PageInput");
  const WC_ShippingMethod = require("./apollo_server/graphql/types/woocommerce/types/WC_ShippingMethod");
  const WC_PaymentMethod = require("./apollo_server/graphql/types/woocommerce/types/WC_PaymentMethod");
  const LanguagesEnum = require('./apollo_server/graphql/enums/LanguagesEnum')

  createTypes(`
    ${WP_Page}
    ${WP_PageInput}
    ${WC_ShippingMethod}
    ${WC_PaymentMethod}
    ${LanguagesEnum}
  `);
}

exports.createResolvers = ({ createResolvers }) => {

  const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
  const WooCommerceQuery = new WooCommerceRestApi({
    url: process.env.GASTBY_WP_URL,
    consumerKey: process.env.GATSBY_WC_KEY,
    consumerSecret: process.env.GATSBY_WC_SECRET,
    version: process.env.GATSBY_WC_VERSION
  });

  createResolvers({
    Query: {
      wp_allPages: {
        type: ['WP_Page'],
        args: {
          language: 'LanguagesEnum',
          filter: 'WP_PageInput'
        },
        resolve: (_, { language, filter }) => wordpressQuery('pages', { language: language, filter: filter })
      },
      wp_allPosts: {
        type: ['WP_Page'],
        args: {
          language: 'LanguagesEnum',
          filter: 'WP_PageInput'
        },
        resolve: (_, { language, filter }) => wordpressQuery('posts', { language: language, filter: filter })
      },
      wc_allShippingMethods: {
        type: ['WC_ShippingMethod'],
        args: {
          zoneId: 'Int!',
        },
        resolve: (_, { zoneId }) => WooCommerceQuery.get(`shipping/zones${zoneId !== undefined ? `/${zoneId}/` : '/'}methods`).then((response) => response.data)
      },
      wc_allPaymentMethods: {
        type: ['WC_PaymentMethod'],
        resolve: () => WooCommerceQuery.get('payment_gateways').then((response) => {

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
      }
    }
  });

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