const path = require(`path`);
const getDirectories = require('./services/getDirectories');

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


exports.createPages = async ({ actions, graphql }) => {

  const languages = getDirectories('./src/languages');

  const { data: pagesData } = await graphql(`
    query getPages {
      allMultilangWpPages(filter: {exclude: {slug: ["home", "catalog"]}, include: {status: publish}}) {
        id
        slug
      }
    }
  `);

  const { data: categoriesData } = await graphql(`
    query getCategories {
      allMultilangWcCategories(params: {hide_empty: true}) {
        id
        slug
      }
    }
  `);

  const { data: productsData } = await graphql(`
    query getProducts {
      allMultilangWcProducts(params: {stock_status: instock, status: publish}) {
        id
        sku
        categories {
          slug
        }
      }
    }
  `);

  languages.forEach((language) => {

    const langPrefix = language === 'ru' ? '' : `${language}/`; //make as default language

    createPages(pagesData, language, langPrefix);
    createProductsPages(categoriesData, language, langPrefix);
    createProductPages(productsData, language, langPrefix);
  });

  function createPages(data, language, langPrefix) {

    data.allMultilangWpPages.forEach((wpPage) => {
      actions.createPage({
        path: `${langPrefix}${wpPage.slug}`,
        component: path.resolve(`./src/components/Layouts/pages/PostPageLayout.tsx`),
        context: {
          pageId: parseInt(wpPage.id),
          language: language,
        },
      });
    });
  }

  function createProductsPages(data, language, langPrefix) {

    data.allMultilangWcCategories.forEach((wcCategory) => {
      actions.createPage({
        path: `${langPrefix}catalog/${wcCategory.slug}`,
        component: path.resolve(`./src/components/Layouts/pages/ProductsPageLayout.tsx`),
        context: {
          categoryId: parseInt(wcCategory.id),
          language: language,
        },
      });
    });
  }

  function createProductPages(data, language, langPrefix) {

    data.allMultilangWcProducts.forEach((wcProduct) => {

      if (wcProduct.sku == '') wcProduct.sku = wcProduct.wordpress_id;

      actions.createPage({
        path: `${langPrefix}catalog/${wcProduct.categories[0].slug}/${wcProduct.categories[0].slug}-${wcProduct.sku}`,
        component: path.resolve(`./src/components/Layouts/pages/ProductPageLayout.tsx`),
        context: {
          productId: parseInt(wcProduct.id),
          language: language,
        },
      });
    });
  }
}