import React from "react"
import { gql } from "@apollo/client";
import { apolloClient } from "../../public/components/Layouts/Layout";
import Layout from "../../public//components/Layouts/Layout";
import CatalogPageContent from "../../public//components/Content/CatalogPageContent";
import MetaData from "../../public//components/Layouts/MetaData";
import { parsePageMetaData } from "../../public//services/parsePageMetaData";

const CatalogPage = ({ catalogPageDataEn }) => {

  const data = catalogPageDataEn;

  return (
    <Layout language="en">
      <CatalogPageContent data={data.allWcProductsCategories} />
    </Layout>
  )
}

export default CatalogPage;

export const Head = ({ catalogPageDataEn }) => {

  const { metaData, openGraphData } = parsePageMetaData(catalogPageDataEn.wpMetaData);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export async function getStaticProps() {

  const { data } = await apolloClient.query({
    query: gql`
      query getCatalogPageDataEn {
        allWcProductsCategories(params: {hide_empty: true}, language: en) {
          image {
            alt
            src
          }
          slug
          name
          description
        }
      
        wpMetaData(pageId: 271, endpoint: pages, language: en) {
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
  });

  return {
    props: {
      catalogPageDataEn: data,
    },
  };
}