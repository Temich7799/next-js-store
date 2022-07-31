import { graphql } from "gatsby";
import * as React from "react"
import styled from "styled-components";
import Layout from "../components/Layouts/MainLayout";
import CategoryThumb from "../components/Product/Thumbs/CategoryThumb";
import TitleH1 from "../components/PageTitle";


const Main = styled.main`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  column-gap: 25px;
  row-gap: 50px;
`

type CatalogProps = {
  data: {
    allWcProductsCategories: {
      edges: Array<object>
    }
  }
}

const CatalogPage = (props: CatalogProps) => {

  const { data } = props;

  return (
    <>
      <Layout>
        <Main>
          <TitleH1>Catalog</TitleH1>
          {data.allWcProductsCategories.edges.map((edge: any) => <CategoryThumb data={edge.node} />)}
        </Main>
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