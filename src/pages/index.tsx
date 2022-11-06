import React from "react"
import Layout from "../components/Layouts/Layout";
import { graphql, useStaticQuery, HeadProps } from "gatsby"
import IndexPageContent from "../components/Content/IndexPageContent"
import MetaData from "../components/Layouts/MetaData";
import useYoastMetaData from "../services/hooks/useYoastMetaData";

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

export default IndexPage

export const Head = (props: HeadProps) => {

  const { metaData, openGraphData } = useYoastMetaData('pages?slug=home', {
    openGraphData: {
      og_url: process.env.GATSBY_SITE_URL
    }
  });

  const linkedData = {
    context: '',
    type: '',
    name: ''
  };

  return <MetaData data={metaData} linkedData={linkedData} openGraphData={openGraphData} />
}
