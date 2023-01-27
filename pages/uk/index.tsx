import React from "react"
import BaseTemplate from "../../public/templates/BaseTemplate";
import { gql } from "@apollo/client";
import { apolloClient } from "../../public/templates/BaseTemplate";
import HomePageTemplate from "../../public/templates/HomePageTemplate"
import MetaData from "../../public/components/MetaData";
import { parsePageMetaData } from "../../public/services/parsePageMetaData";
import { getMenuItems } from "../../public/services/getMenuItems"

const IndexPage = ({ menuItemsData, content }) => {

  return (
    <BaseTemplate data={menuItemsData} language="uk">
      <HomePageTemplate data={content} />
    </BaseTemplate>
  )
}

export default IndexPage;

export const Head = ({ content }) => {

  const { metaData, openGraphData } = parsePageMetaData(content.wpPage.yoast_head_json);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export async function getStaticProps() {

  const language = 'uk';

  const { data } = await apolloClient.query({
    query: gql`
      query homePageDataRu($language: LanguagesEnum) {
        wpPage(pageId: 25, language: $language) {
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
    variables: {
      language: language
    }
  });

  return {
    props: {
      content: data.wpPage.content.rendered,
      menuItemsData: await getMenuItems(language)
    },
  };
}