import * as React from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import ProductThumb from "../Product/ProductThumb";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  padding: 2.5%;
`

type ProductsProps = {
  data: {
    allWcProducts: {
      edges: Array<object>
    }
  }
}

const ProductsLayout = (props: ProductsProps) => {

  const { data } = props;

  return (
    <Layout>
      <Main>
        {data.allWcProducts.edges.map((edge: any) => <ProductThumb data={edge.node} />)}
      </Main>
    </Layout>
  )
}

export default ProductsLayout

export const query = graphql`
  query getProducts {
    allWcProducts {
      edges {
        node {
          name
          price
          sku
          purchasable
          sale_price
          slug
          images {
            src
            alt
          }
          categories {
            slug
          }
        }
      }
    }
  }
`;

