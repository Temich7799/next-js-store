import React from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import ProductThumb from "../Product/Thumbs/ProductThumb";
import styled from "styled-components";
import useMobile from "../../services/hooks/useMobile";

const Main = styled.main<any>`
    margin-top: ${props => props.isMobile ? "125px" : "0"};
`;

const Content = styled.div`
  max-width: 1900;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(auto, 200px));
  justify-content: center;
  gap: 50px;
  padding: 2.5%;
`

type Product = {
  node: {
    name: string
    price: string
    sku: string
    purchasable: boolean
    sale_price: string
    slug: string
    images: [
      {
        alt: string
        localFile: object
      }
    ]
    categories: [
      {
        slug: string
      }
    ]
    wordpress_id: number
  }
}

type ProductsProps = {
  data: {
    allWcProducts: {
      edges: [Product]
    }
  }
}

const ProductsLayout = (props: ProductsProps) => {

  const { data } = props;

  const isMobile = useMobile();

  return (
    <Layout>
      <Main isMobile={isMobile}>
        <Content>
          {
            data.allWcProducts.edges.map((edge: Product) =>
              document.location.href.split('/catalog/')[1] == edge.node.categories[0].slug &&
              <ProductThumb data={edge.node} />)
          }
        </Content>
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
            alt
            localFile {
              childImageSharp {
                gatsbyImageData(webpOptions: {quality: 85}, height: 240)
              }
            }
          }
          categories {
            slug
          }
          wordpress_id
        }
      }
    }
  }
`;

