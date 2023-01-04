import React from "react"
import Layout from "../../public//components/Layouts/Layout";
import { gql } from "@apollo/client";
import client from "../../apollo-client";
import HomePageContent from "../../public//components/Content/HomePageContent";
import MetaData from "../../public//components/Layouts/MetaData";
import { parsePageMetaData } from "../../public//services/parsePageMetaData";

const IndexPage = ({ homePageDataUk }) => {

  const { wpPage } = homePageDataUk;

  return (
    <Layout language="uk">
      <HomePageContent data={wpPage} />
    </Layout>
  )
}

export default IndexPage;

export const Head = ({ homePageDataUk }) => {

  const { metaData, openGraphData } = parsePageMetaData(homePageDataUk.wpPage.yoast_head_json);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query getHomePageDataUk {    
        wpPage(pageId: 25, language: uk) {
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
      homePageDataUk: data,
    },
  };
}