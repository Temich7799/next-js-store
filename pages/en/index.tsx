import React from "react"
import Layout from "../../public//components/Layouts/Layout";
import { gql } from "@apollo/client";
import { apolloClient } from "../../public/components/Layouts/Layout";
import HomePageContent from "../../public//components/Content/HomePageContent";
import MetaData from "../../public//components/Layouts/MetaData";
import { parsePageMetaData } from "../../public//services/parsePageMetaData";

const IndexPage = ({ homePageDataEn }) => {

  const { wpPage } = homePageDataEn;

  return (
    <Layout language="en">
      <HomePageContent data={wpPage} />
    </Layout>
  )
}

export default IndexPage;

export const Head = ({ homePageDataEn }) => {

  const { metaData, openGraphData } = parsePageMetaData(homePageDataEn.wpPage.yoast_head_json);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export async function getStaticProps() {

  const { data } = await apolloClient.query({
    query: gql`
      query getHomePageDataEn {
        wpPage(pageId: 25, language: en) {
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
    `,
  });

  return {
    props: {
      homePageDataEn: data,
    },
  };
}