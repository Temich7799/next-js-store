import React from "react"
import { gql } from "@apollo/client";
import { apolloClient } from "../../public/components/Layouts/Layout";
import Layout from "../../public//components/Layouts/Layout";
import CatalogPageContent from "../../public//components/Content/CatalogPageContent";
import MetaData from "../../public//components/Layouts/MetaData";
import { parsePageMetaData } from "../../public//services/parsePageMetaData";

const CatalogPage = ({ catalogPageDataUk }) => {

  const data = catalogPageDataUk;

  return (
    <Layout language="uk">
      <CatalogPageContent data={data.allWcProductsCategories} />
    </Layout>
  )
}

export default CatalogPage;

export const Head = ({ catalogPageDataUk }) => {

  const { metaData, openGraphData } = parsePageMetaData(catalogPageDataUk.wpMetaData);

  return <MetaData data={metaData} openGraphData={openGraphData} />
}

export async function getStaticProps() {

  const { data } = await apolloClient.query({
    query: gql`
      query getCatalogPageDataUk {
        allWcProductsCategories(params: {hide_empty: true}, language: uk) {
          image {
            alt
            src
          }
          slug
          name
          description
        }
      
        wpMetaData(pageId: 271, endpoint: pages, language: uk) {
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
      catalogPageDataUk: data,
    },
  };
}