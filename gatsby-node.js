const path = require(`path`)

exports.createPages = async function ({ actions, graphql }) {

  async function makePages() {
    const { data } = await graphql(`
      query getPages {
      allWpPage {
        edges {
          node {
            content
            slug
          }
        }
      }
    }
    `);

    data.allWpPage.edges.forEach((edge) => {
      if (edge.node.slug !== 'catalog') {
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
        context: { slug: edge.node.slug },
      })
    })
  }

  makePages();
  makeProductsPages();

}