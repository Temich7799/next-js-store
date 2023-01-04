import React from "react"
import Layout from "../../public//components/Layouts/Layout";
import { graphql, useStaticQuery } from "gatsby"
import HomePageContent from "../../public//components/Content/HomePageContent";
import MetaData from "../../public//components/Layouts/MetaData";
import { parsePageMetaData } from "../../public//services/parsePageMetaData";

const IndexPage = (props: any) => {

  const { multilangWpPage } = props.data;

  return (
    <Layout language="uk">
      <HomePageContent data={multilangWpPage} />
    </Layout>
  )
}

export default IndexPage;

export const Head = (props: any) => {

  const { metaData, openGraphData } = parsePageMetaData(props.data.multilangWpPage.yoast_head_json);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export const query = graphql`
  query getHomePageDataUk {
    
    multilangWpPage(pageId: 25, language: uk) {
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