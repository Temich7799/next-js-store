import React from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import ProductsPage from "../Products/ProductsPage";

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

  const gatsbyImages = new Map<number, Array<string>>();

  data.allWcProducts.edges.forEach((edge: Product) => {

    const images: Array<string> = [];

    if (edge.node.stock_quantity > 0 || edge.node.stock_status == 'instock') {
      edge.node.images.forEach((image: object | any) => {
        images.push(image.localFile.childImageSharp.gatsbyImageData.images.fallback.src);
      });

      gatsbyImages.set(edge.node.wordpress_id, images);
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

