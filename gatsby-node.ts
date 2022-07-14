const path = require(`path`)

exports.createPages = async function ({ actions, graphql }: any) {

  const { data } = await graphql(`
     query Pages {
                allWpPage {
                  edges {
                    node {
                      content
                      slug
                    }
                  }
                }
            }
    `)

  data.allWpPage.edges.forEach((edge: any) => {
    const slug = edge.node.slug

    actions.createPage({
      path: slug,
      component: path.resolve(`./src/components/Layout.tsx`),
      context: { slug: slug },
    })

  })

}