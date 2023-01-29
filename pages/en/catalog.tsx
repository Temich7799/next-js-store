import { gql } from "@apollo/client";
import { apolloClient } from "../../public/templates/BaseTemplate";
import React from "react"
import BaseTemplate from "../../public/templates/BaseTemplate";
import CatalogPageTemplate from "../../public/templates/CatalogPageTemplate";
import MetaData from "../../public/components/MetaData";
import { parsePageMetaData } from "../../public/services/parsePageMetaData";
import { getMenuItems } from "../../public/services/getMenuItems"

const CatalogPage = ({ menuItemsData, catalogPageData, metaData }) => {

  const { metaData: meta, openGraphData } = parsePageMetaData(metaData);

  return (
    <>
      <MetaData data={meta} openGraphData={openGraphData} />
      <BaseTemplate data={menuItemsData} language="en">
        <CatalogPageTemplate data={catalogPageData.allWcProductsCategories} />
      </BaseTemplate>
    </>
  )
}

export default CatalogPage;

export async function getServerSideProps() {

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
      metaData: data.wpMetaData,
      menuItemsData: await getMenuItems(language)
    },
  };
}