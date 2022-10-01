const path = require(`path`);
const { fetch } = require('cross-fetch');
require("dotenv").config();

exports.createPages = async function ({ actions, graphql }) {

  async function makePages() {

    const { data } = await graphql(`
      query getPagesData {
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
          component: path.resolve(`./src/components/Layouts/PageLayout.tsx`),
          context: {
            slug: edge.node.slug
          },
        })
      }
    });
  }

  async function makeProductsPages() {

    const { data } = await graphql(`
      query getCategoriesData {
        allWcProductsCategories {
          edges {
            node {
              wordpress_id
              slug
              yoast_head_json {
                description
                og_description
                og_site_name
                og_title
                og_type
                title
              }
            }
          }
        }
      }
  `);

    data.allWcProductsCategories.edges.forEach((edge) => {

      actions.createPage({
        path: `catalog/${edge.node.slug}`,
        component: path.resolve(`./src/components/Layouts/ProductsLayout.tsx`),
        context: {
          categoryId: edge.node.wordpress_id,
          metaData: {
            ...edge.node.yoast_head_json,
            og_url: `${process.env.GATSBY_SITE_URL}/catalog/${edge.node.slug}`
          }
        },
      })
    });
  }

  async function makeProductPages() {

    const { data } = await graphql(`
      query getProductsData {
        allWcProducts(filter: {stock_status: {eq: "instock"}, status: {eq: "publish"}}) {
          edges {
            node {
              sku
              wordpress_id         
              categories {
                slug
              }
              yoast_head_json {
                title
                description
                og_type
                og_title
                og_description
                article_modified_time
                og_site_name
                og_image {
                    url
                    type
                    width
                    height
                }
            }
            date_created
            date_modified
            }
          }
        }
      }
    `);

    data.allWcProducts.edges.forEach((edge) => {

      if (edge.node.sku == '') edge.node.sku = edge.node.wordpress_id;

      actions.createPage({
        path: `catalog/${edge.node.categories[0].slug}/${edge.node.categories[0].slug}-${edge.node.sku}`,
        component: path.resolve(`./src/components/Layouts/ProductLayout.tsx`),
        context: {
          productId: edge.node.wordpress_id,
          metaData: {
            ...edge.node.yoast_head_json,
            og_url: `${process.env.GATSBY_SITE_URL}/catalog/${edge.node.categories[0].slug}/${edge.node.categories[0].slug}-${edge.node.sku}`
          }
        },
      })
    });
  }

  makePages();
  makeProductsPages();
  makeProductPages();

}