import React from "react"
import Layout from "../components/Layouts/Layout";
import { graphql, useStaticQuery } from "gatsby"
import IndexPageContent from "../components/Content/IndexPageContent";

const IndexPage = () => {

  const { multilangWpPage } = useStaticQuery(graphql`
    query getHomePageRu {
      multilangWpPage(pageId: 25) {
        content {
          rendered
        }
      }
    }
  `);

  return (
    <Layout>
      <IndexPageContent data={multilangWpPage} />
    </Layout>
  )
}

export default IndexPage;
