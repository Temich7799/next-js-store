import React from "react"
import Layout from "../components/Layouts/Layout";
import { graphql, useStaticQuery } from "gatsby"
import IndexPageContent from "../components/Content/IndexPageContent"
import MetaData from "../components/Layouts/MetaData";
import { parsePageMetaData } from "../services/parsePageMetaData";

const IndexPage = (props: any) => {

  const { multilangWpPage } = props.data;

  return (
    <Layout language="ru">
      <IndexPageContent data={multilangWpPage} />
    </Layout>
  )
}

export default IndexPage;

export const Head = (props: any) => {

  const { metaData, openGraphData } = parsePageMetaData(props.data.multilangWpPage.yoast_head_json);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export const query = graphql`
  query getHomePageDataRu {
    
    multilangWpPage(pageId: 25, language: ru) {
      content {
        rendered
      }
      yoast_head_json {
        title
        description
        og_title
        og_type
        og_locale
        og_site_name
        og_description
      }
    }    
  }
`;