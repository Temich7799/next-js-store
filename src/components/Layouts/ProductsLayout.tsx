import React from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import ProductsPage from "../Products/ProductsPage";

type Product = {
  node: {
    stock_quantity: number
    stock_status: string
    images: [
      {
        alt: string
        localFile: object | any
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

  const gatsbyImages = new Map<number, string>();

  data.allWcProducts.edges.forEach((edge: Product) => {
    if (edge.node.stock_quantity > 0 || edge.node.stock_status == 'instock') {
      gatsbyImages.set(edge.node.wordpress_id, edge.node.images[0].localFile.childImageSharp.gatsbyImageData.images.fallback.src);
    }
  });

  return (
    <Layout>
      <ProductsPage data={gatsbyImages} />
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

