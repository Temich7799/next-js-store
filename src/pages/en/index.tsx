import React from "react"
import Layout from "../../components/Layouts/Layout";
import { graphql, HeadProps, useStaticQuery } from "gatsby"
import IndexPageContent from "../../components/Content/IndexPageContent";
import useYoastMetaData from "../../services/hooks/useYoastMetaData";
import MetaData from "../../components/Layouts/MetaData";

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
