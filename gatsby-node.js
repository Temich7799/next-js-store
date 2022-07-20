const path = require(`path`)

exports.createPages = async function ({ actions, graphql }) {

  async function makePages() {

    const { data } = await graphql(`
      query getPages {
      allWpPage {
        edges {
          node {
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

  async function makeProductPages() {

    const { data } = await graphql(`
      query getProducts {
        allWcProducts {
          edges {
            node {
              sku
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
      actions.createPage({
        path: `catalog/${edge.node.categories[0].slug}/${edge.node.categories[0].slug}-${edge.node.sku}`,
        component: path.resolve(`./src/components/Layouts/ProductLayout.tsx`),
        context: { slug: edge.node.slug },
      })
    })
  }

  makePages();
  makeProductsPages();
  makeProductPages();

}