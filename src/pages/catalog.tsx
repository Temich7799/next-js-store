import { graphql } from "gatsby";
import * as React from "react"
import styled from "styled-components";
import Layout from "../components/Layout";
import CategoryThumb from "../components/Product/CategoryThumb";


const StyledCatalogPage = styled.main`
  display: flex;
  justify-content: space-around;
`

const CatalogPage = ({ data }: any) => {
  return (
    <>
      <Layout>
        <StyledCatalogPage>
          {data.allWcProductsCategories.edges.map((edge: any) => <CategoryThumb data={edge} />)}
        </StyledCatalogPage>
      </Layout>
    </>
  )
}

export default CatalogPage;

export const query = graphql`
query getCategories {
  allWcProductsCategories {
    edges {
      node {
        image {
          alt
          src
        }
        slug
        name
        description
      }
    }
  }
}
`;