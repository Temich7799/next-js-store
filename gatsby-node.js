const path = require(`path`);

exports.createSchemaCustomization = ({ actions }) => {

  const { createTypes } = actions;

  const WP_Page = require("./apollo_server/graphql/types/wordpress/WP_Page");
  const WP_PageFilter = require("./apollo_server/graphql/types/wordpress/inputs/WP_PageFilter");
  const WP_MenuItem = require("./apollo_server/graphql/types/wordpress/WP_MenuItem");
  const WP_MenuItemFilter = require("./apollo_server/graphql/types/wordpress/inputs/WP_MenuItemFilter");
  const WC_ShippingMethod = require("./apollo_server/graphql/types/woocommerce/types/WC_ShippingMethod");
  const WC_PaymentMethod = require("./apollo_server/graphql/types/woocommerce/types/WC_PaymentMethod");
  const WC_Product = require("./apollo_server/graphql/types/woocommerce/types/WC_Product");
  const WC_ProductParams = require("./apollo_server/graphql/types/woocommerce/inputs/WC_ProductParams");
  const WC_Category = require("./apollo_server/graphql/types/woocommerce/types/WC_Category");
  const WC_ProductCategoryParams = require("./apollo_server/graphql/types/woocommerce/inputs/WC_ProductCategoryParams");
  const LanguagesEnum = require('./apollo_server/graphql/enums/LanguagesEnum')
  const StockStatusesEnum = require('./apollo_server/graphql/enums/StockStatusesEnum')

  createTypes(`
    ${WP_Page}
    ${WP_PageFilter}
    ${WP_MenuItem}
    ${WP_MenuItemFilter}
    ${WC_ShippingMethod}
    ${WC_PaymentMethod}
    ${WC_Product}
    ${WC_ProductParams}
    ${WC_Category}
    ${WC_ProductCategoryParams}
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

      multilangWpPage: require("./graphql/resolvers/queries/multilangWpPage"),
      multilangWpPost: require("./graphql/resolvers/queries/multilangWpPost"),
      multilangWcProduct: require("./graphql/resolvers/queries/multilangWcProduct"),
    }
  });
}


exports.createPages = async function ({ actions, graphql }) {

  {
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
          component: path.resolve(`./src/components/Layouts/pages/PostPageLayout.tsx`),
          context: { slug: edge.node.slug },
        })
      }
    })
  }

  {
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
        component: path.resolve(`./src/components/Layouts/pages/ProductsPageLayout.tsx`),
        context: { categoryId: edge.node.wordpress_id },
      })
    })
  }

  {
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
        component: path.resolve(`./src/components/Layouts/pages/ProductPageLayout.tsx`),
        context: { productId: edge.node.wordpress_id },
      })
    })
  }
}