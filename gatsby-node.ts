const path = require(`path`)

exports.createPages = async function ({ actions, graphql }) {
    /*
    const { data } = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
    
    data.allMarkdownRemark.edges.forEach(edge => {
        */
    const slug = 'test'
    actions.createPage({
        path: slug,
        component: path.resolve(`./src/pages/Page.tsx`),
        context: { slug: slug },
    })
    /*
  })
  */
}