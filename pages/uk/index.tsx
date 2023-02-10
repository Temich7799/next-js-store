import React from "react"
import BaseTemplate from "../../public/templates/BaseTemplate";
import { gql } from "@apollo/client";
import { apolloClient } from "../../public/templates/BaseTemplate";
import HomePageTemplate from "../../public/templates/HomePageTemplate"
import MetaData from "../../public/components/MetaData";
import { parsePageMetaData } from "../../public/services/parsePageMetaData";
import { getMenuItems } from "../../public/services/getMenuItems"

const IndexPage = ({ menuItemsData, content, metaData, bannerFolderContent }) => {

  const { metaData: meta, openGraphData } = parsePageMetaData(metaData);

  return (
    <>
      <MetaData data={meta} openGraphData={openGraphData} />
      <BaseTemplate data={menuItemsData} language="uk">
        <HomePageTemplate data={content} bannerFolderContent={bannerFolderContent} />
      </BaseTemplate>
    </>
  )
}

export default IndexPage;

export async function getStaticProps() {

  const language = 'uk';

  const bannerFolderPath = 'images/banners';
  const fs = require('fs');

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
      metaData: data.wpPage.yoast_head_json,
      menuItemsData: await getMenuItems(language),
      bannerFolderContent: {
        desktop: fs.readdirSync('public/' + bannerFolderPath).map((file: string) => '/' + bannerFolderPath + '/' + file),
        mobile: fs.readdirSync('public/' + bannerFolderPath + '/mobile').map((file: string) => '/' + bannerFolderPath + '/mobile/' + file)
      }
    },
  };
}