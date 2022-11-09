const path = require(`path`);
const getDirectories = require('./services/getDirectories');

exports.createSchemaCustomization = ({ actions }) => {

  const { createTypes } = actions;

  const typeDefs = require('./gatsby_node/typeDefs')

  createTypes(typeDefs);
}

exports.createResolvers = ({ createResolvers }) => {

  createResolvers({

    Query: {
      allMultilangWpPages: require("./graphql/resolvers/queries/allMultilangWpPages"),
      allMultilangWpPosts: require("./graphql/resolvers/queries/allMultilangWpPosts"),
      allMultilangWpMenuItems: require("./graphql/resolvers/queries/allMultilangWpMenuItems"),
      allMultilangWcShippingMethods: require("./graphql/resolvers/queries/allMultilangWcShippingMethods"),
      allMultilangWcPaymentMethods: require("./graphql/resolvers/queries/allMultilangWcPaymentMethods"),
      allMultilangWcProducts: require("./graphql/resolvers/queries/allMultilangWcProducts"),
      allMultilangWcCategories: require("./graphql/resolvers/queries/allMultilangWcCategories"),

      multilangWpPage: require("./graphql/resolvers/queries/multilangWpPage"),
      multilangWpMetaData: require("./graphql/resolvers/queries/multilangWpMetaData"),
      multilangWpPost: require("./graphql/resolvers/queries/multilangWpPost"),
      multilangWcProduct: require("./graphql/resolvers/queries/multilangWcProduct"),
    }
  });
}

exports.createPages = async ({ actions, graphql }) => {

  const languages = getDirectories('./src/languages');

  const { data: allPagesData } = await graphql(`

    query getAllMultilangWpPages {

      ru: allMultilangWpPages(filter: {exclude: {slug: ["home", "catalog"]}, include: {status: publish}}) {
        title {
          rendered
        }
        content {
          rendered
        }
        slug
        yoast_head_json {
          title
          description
          og_title
          og_type
          og_locale
          og_site_name
          og_description
        }
      }

      uk: allMultilangWpPages(language: uk, filter: {exclude: {slug: ["home", "catalog"]}, include: {status: publish}}) {
        title {
          rendered
        }
        content {
          rendered
        }
        slug
        yoast_head_json {
          title
          description
          og_title
          og_type
          og_locale
          og_site_name
          og_description
        }
      }

      en: allMultilangWpPages(language: en, filter: {exclude: {slug: ["home", "catalog"]}, include: {status: publish}}) {
        title {
          rendered
        }
        content {
          rendered
        }
        slug
        yoast_head_json {
          title
          description
          og_title
          og_type
          og_locale
          og_site_name
          og_description
        }
      }
    }
  `);

  const { data: allCategoriesData } = await graphql(`
    query getAllWcCategories {

      ru: allMultilangWcCategories(params: {hide_empty: true}) {
        id
        slug
        yoast_head_json {
          title
          description
          og_title
          og_type
          og_locale
          og_site_name
          og_description
        }
      }

      uk: allMultilangWcCategories(language: uk, params: {hide_empty: true}) {
        id
        slug
        yoast_head_json {
          title
          description
          og_title
          og_type
          og_locale
          og_site_name
          og_description
        }
      }

      en: allMultilangWcCategories(language: en, params: {hide_empty: true}) {
        id
        slug
        yoast_head_json {
          title
          description
          og_title
          og_type
          og_locale
          og_site_name
          og_description
        }
      }
    }
  `);

  const { data: allProductsData } = await graphql(`
    query getAllWcProducts {
      ru: allMultilangWcProducts(params: { stock_status: instock, status: publish, per_page: 2000 }) {
        name
        sku
        price
        sale_price
        stock_quantity
        description
        related_ids
        id
        attributes {
          options
          name
        }
          images {
          alt
          src
        }
        categories {
          slug
        }
        yoast_head_json {
          title
          description
          og_title
          og_type
          og_locale
          og_site_name
          og_description
        }
      }

      uk: allMultilangWcProducts(language: uk, params: { stock_status: instock, status: publish, per_page: 2000 }) {
        name
        sku
        price
        sale_price
        stock_quantity
        description
        related_ids
        id
        attributes {
          options
          name
        }
          images {
          alt
          src
        }
        categories {
          slug
        }
        yoast_head_json {
          title
          description
          og_title
          og_type
          og_locale
          og_site_name
          og_description
        }
      }

      en: allMultilangWcProducts(language: en, params: { stock_status: instock, status: publish, per_page: 2000 }) {
        name
        sku
        price
        sale_price
        stock_quantity
        description
        related_ids
        id
        attributes {
          options
          name
        }
          images {
          alt
          src
        }
        categories {
          slug
        }
        yoast_head_json {
          title
          description
          og_title
          og_type
          og_locale
          og_site_name
          og_description
        }
      }
    }      
  `);

  const compImages = await getProductsGatsbyImages();


  languages.forEach((language) => {

    const langPrefix = language === 'ru' ? '' : `${language}/`; //make as default language

    createPages(allPagesData, language, langPrefix);
    createProductsListPages(allCategoriesData, compImages, language, langPrefix);
    createProductPages(allProductsData, compImages, language, langPrefix);
  });

  function createPages(data, language, langPrefix) {

    data[language].forEach((wpPage) => {
      actions.createPage({
        path: `${langPrefix}${wpPage.slug}`,
        component: path.resolve(`./src/components/Layouts/pages/PostPageLayout.tsx`),
        context: {
          pageData: wpPage,
          language: language,
        },
      });
    });
  }

  function createProductsListPages(data, compImages, language, langPrefix) {

    data[language].forEach((wcCategory) => {
      actions.createPage({
        path: `${langPrefix}catalog/${wcCategory.slug}`,
        component: path.resolve(`./src/components/Layouts/pages/ProductsListPageLayout.tsx`),
        context: {
          pageData: wcCategory,
          compImages: compImages,
          language: language,
        },
      });
    });
  }

  function createProductPages(data, compImages, language, langPrefix) {

    data[language].forEach(wcProduct => {

      if (wcProduct.sku == '') wcProduct.sku = wcProduct.wordpress_id;

      actions.createPage({
        path: `${langPrefix}catalog/${wcProduct.categories[0].slug}/${wcProduct.categories[0].slug}-${wcProduct.sku}`,
        component: path.resolve(`./src/components/Layouts/pages/ProductPageLayout.tsx`),
        context: {
          productData: wcProduct,
          compImages: compImages,
          language: language,
        },
      });
    });
  }

  async function getProductsGatsbyImages() {

    const { data } = await graphql(`
      query getProductsGatsbyImages {
          allWcProducts(filter: {stock_status: {eq: "instock"}, status: {eq: "publish"}}){
            edges {
              node {
                wordpress_id
                images {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(webpOptions: {quality: 85}, height: 240, formats: WEBP)
                    }
                  }
                }
              }
            }
          }
        }
    `);

    const compImages = {};

    data && data.allWcProducts.edges.forEach(edge => {

      const productImages = edge.node.images.map(image => image.localFile && image.localFile.childImageSharp && image.localFile.childImageSharp.gatsbyImageData.images.fallback.src);

      compImages[edge.node.wordpress_id] = productImages;
    });

    return compImages;
  }
}
