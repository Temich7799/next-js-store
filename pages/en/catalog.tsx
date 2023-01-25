import { gql } from "@apollo/client";
import { apolloClient } from "../../public/templates/BaseTemplate";
import React from "react"
import BaseTemplate from "../../public/templates/BaseTemplate";
import CatalogPageTemplate from "../../public/templates/CatalogPageTemplate";
import MetaData from "../../public/components/Layouts/MetaData";
import { parsePageMetaData } from "../../public/services/parsePageMetaData";
import { getMenuItems } from "../../public/services/getMenuItems"

const CatalogPage = (props: any) => {

  return (
    <BaseTemplate data={props.menuItemsData} language="en">
      <CatalogPageTemplate data={props.catalogPageData.allWcProductsCategories} />
    </BaseTemplate>
  )
}

export default CatalogPage;

export const Head = (props: any) => {

  const { metaData, openGraphData } = parsePageMetaData(props.catalogPageData.wpMetaData);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export async function getStaticProps() {

  const language = 'en';

  const { data } = await apolloClient.query({
    query: gql`
      query catalogPageDataRu($language: LanguagesEnum) {
        allWcProductsCategories(params: {hide_empty: true}, language: $language) {
          image {
            alt
            src
          }
          slug
          name
          description
        }
      
        wpMetaData(pageId: 271, endpoint: pages, language: $language) {
            title
            description
            og_title
            og_type
            og_locale
            og_site_name
            og_description
          }
      }
    `,
    variables: {
      language: language
    }
  });

  return {
    props: {
      catalogPageData: data,
      menuItemsData: await getMenuItems(language)
    },
  };
}