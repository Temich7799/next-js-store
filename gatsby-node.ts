const path = require(`path`)

exports.createPages = async function ({ actions, graphql }) {

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

    data.allWpPage.edges.forEach(edge => {
        const slug = edge.node.slug

        actions.createPage({
            path: slug,
            component: path.resolve(`./src/components/Layout.tsx`),
            context: { slug: slug },
        })

    })

}