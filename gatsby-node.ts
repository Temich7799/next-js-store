import { graphql, useStaticQuery } from "gatsby";
import path from "path"

exports.createPages = ({ actions }) => {

    const data = useStaticQuery(graphql`
    query Pages {
        allWpPage {
            edges {
              node {
                content
                link
              }
            }
          }
        }
    `);
    actions.createPage({
        path: data.allWpPage.edges[0].node.link,
        component: path.resolve('./src/pages/index.tsx'),
        context: data.allWpPage.edges[0].node.content,
    })
};