const path = require(`path`)

exports.createPages = async function ({ actions, graphql }) {

  async function makePages() {

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
      if (edge.node.slug !== 'catalog' || edge.node.slug !== 'home') {
        actions.createPage({
          path: edge.node.slug,
          component: path.resolve(`./src/components/Layouts/PageLayout.tsx`),
          context: { slug: edge.node.slug },
        })
      }
    })
  }

  async function makeProductsPages() {

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
        component: path.resolve(`./src/components/Layouts/ProductsLayout.tsx`),
        context: { categoryId: edge.node.wordpress_id },
      })
    })
  }

  async function makeProductPages() {

    const { data } = await graphql(`
      query getProducts {
        allWcProducts(filter: {stock_status: {eq: "instock"}, status: {eq: "publish"}}) {
          edges {
            node {
              sku
              wordpress_id
              slug
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
        component: path.resolve(`./src/components/Layouts/ProductLayout.tsx`),
        context: { productId: edge.node.wordpress_id },
      })
    })
  }

  makePages();
  makeProductsPages();
  makeProductPages();

}