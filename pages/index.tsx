import React from "react"
import Layout from "../public/components/Layouts/Layout";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import HomePageContent from "../public/components/Content/HomePageContent"
import MetaData from "../public/components/Layouts/MetaData";
import { parsePageMetaData } from "../public/services/parsePageMetaData";

const IndexPage = ({ homePageDataRu }) => {

  const { wpPage } = homePageDataRu;

  return (
    <Layout language="ru">
      <HomePageContent data={wpPage} />
    </Layout>
  )
}

export default IndexPage;

export const Head = ({ homePageDataRu }) => {

  const { metaData, openGraphData } = parsePageMetaData(homePageDataRu.wpPage.yoast_head_json);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export async function getStaticProps() {

  const { data } = await client.query({
    query: gql`
      query getHomePageDataRu {
        wpPage(pageId: 25, language: ru) {
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
      homePageDataRu: data,
    },
  };
}