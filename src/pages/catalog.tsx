import { graphql } from "gatsby";
import React from "react"
import styled from "styled-components";
import Layout from "../components/Layouts/MainLayout";
import CategoryThumb from "../components/Product/Thumbs/CategoryThumb";
import PageTitle from "../components/PageTitle";
import useMobile from "../services/hooks/useMobile";

const Main = styled.main<any>`
  margin-top: ${props => props.isMobile ? "125px" : "0"};
`;

const Content = styled.div`
  max-width: 1900px;
  margin: 0 auto;
  padding: 2.5%;
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

  const isMobile = useMobile();

  return (
    <>
      <Layout>
        <>
          <Main isMobile={isMobile}>
            <PageTitle>Catalog</PageTitle>
            <Content>
              {data.allWcProductsCategories.edges.map((edge: any) => <CategoryThumb data={edge.node} />)}
            </Content>
          </Main>
        </>
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