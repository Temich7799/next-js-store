import React, { useEffect } from "react";
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
    stock_quantity: number
    stock_status: string
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
    quantity: number
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

  const gatsbyImages = new Map();

  data.allWcProducts.edges.forEach((edge: Product) => {

    const images: Array<string> = [];

    if (edge.node.stock_quantity > 0 || edge.node.stock_status == 'instock') {
      edge.node.images.forEach((image: object | any) => {
        images.push(image.localFile.childImageSharp.gatsbyImageData.images.fallback.src);
      });

      gatsbyImages.set(edge.node.wordpress_id, images);
    }

  });

  useEffect(() => { console.log(gatsbyImages) }, []);

  const isMobile = useMobile();

  return (
    <Layout>
      <Main isMobile={isMobile}>
        <Content>
          {
            /*
            data.allWcProducts.edges.map((edge: Product) => {
              console.log(edge.node.stock_status)
              const isProductInStock = (edge.node.stock_quantity !== null && edge.node.stock_quantity > 0) || edge.node.stock_status == 'instock';
              const isCategoryMatch = typeof document !== `undefined` && document.location.href.split('/catalog/')[1] == edge.node.categories[0].slug;
              return (
                isProductInStock && isCategoryMatch && <ProductThumb data={edge.node} key={edge.node.wordpress_id} />)
            })
            */
          }
        </Content>
      </Main>
    </Layout>
  )
}

export default ProductsLayout

export const query = graphql`
  query getProductImages {
    allWcProducts {
      edges {
        node {
          stock_quantity
          stock_status
          wordpress_id
          images {
            localFile {
              childImageSharp {
                gatsbyImageData(webpOptions: {quality: 85}, height: 240)
              }
            }
          }
        }
      }
    }
  }
         
`;

