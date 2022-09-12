import React, { useEffect } from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import ProductsPage from "../Products/ProductsPage";

type Product = {
  node: {
    stock_quantity: number
    stock_status: string
    categories: [
      {
        wordpress_id: number
      }
    ]
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
      <ProductsPage gatsbyImages={gatsbyImages} categoryId={data.allWcProducts.edges[0].node.categories[0].wordpress_id.toString()} />
    </Layout>
  )
}

export default ProductsLayout

export const query = graphql`
  query getProductImages($categoryId: Int) {
    allWcProducts(filter: {categories: {elemMatch: {wordpress_id: {eq: $categoryId}}}}){
      edges {
        node {
          stock_quantity
          stock_status
          categories {
            wordpress_id
          }
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

