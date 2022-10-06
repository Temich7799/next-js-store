const path = require(`path`);

exports.createSchemaCustomization = ({ actions }) => {

  const { createTypes } = actions;

  const WP_Page = require("./apollo_server/graphql/types/wordpress/WP_Page");
  const WP_PageInput = require("./apollo_server/graphql/types/wordpress/inputs/WP_PageInput");
  const WP_MenuItem = require("./apollo_server/graphql/types/wordpress/WP_MenuItem");
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
    ${WP_MenuItem}
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

  createResolvers({

    Query: {
      allMultilangWpPages: require("./graphql/resolvers/queries/allMultilangWpPages"),
      allMultilangWpPosts: require("./graphql/resolvers/queries/allMultilangWpPosts"),
      allMultilangWpMenuItems: require("./graphql/resolvers/queries/allMultilangWpMenuItems"),
      allMultilangWcShippingMethods: require("./graphql/resolvers/queries/allMultilangWcShippingMethods"),
      allWcPaymentMethods: require("./graphql/resolvers/queries/allMultilangWcPaymentMethods"),
      allMultilangWcProducts: require("./graphql/resolvers/queries/allMultilangWcProducts"),
      allMultilangWcCategories: require("./graphql/resolvers/queries/allMultilangWcCategories"),
    }
  });
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