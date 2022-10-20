import React from "react"
import Layout from "../../components/Layouts/Layout";
import { graphql, useStaticQuery } from "gatsby"
import IndexPageContent from "../../components/Content/IndexPageContent";

const IndexPage = () => {

  const { multilangWpPage } = useStaticQuery(graphql`
    query getHomePageEn {
      multilangWpPage(pageId: 25, language: en) {
        content {
          rendered
        }
      }
    }
  `);

  return (
    <Layout language="en">
      <IndexPageContent data={multilangWpPage} />
    </Layout>
  )
}

export default IndexPage;
