import * as React from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import styled from "styled-components";
import ProductGallery from "../Product/ProductGallery";
import ProductAbout from "../Product/ProductAbout";
import ProductDescription from "../Product/ProductDescription";
import ProductReviews from "../Product/ProductReviews";

const Main = styled.main`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 25px;
    padding: 5%;
`;

type ProductProps = {
    data: any
}

const ProductLayout = (props: ProductProps) => {

    const { data } = props;

    console.log(data);

    return (
        <Layout>
            <Main>
                <ProductGallery data={data.wcProducts.images}></ProductGallery>
                <ProductAbout data={data.wcProducts}></ProductAbout>
                <ProductDescription data={data.wcProducts.description}></ProductDescription>
                <hr />
                <ProductReviews></ProductReviews>
            </Main>
        </Layout>
    )
}

export default ProductLayout

export const query = graphql`
  query getProduct($slug: String!){
    wcProducts(slug: { eq: $slug }){
        price
        sale_price
      related_products {
            name
            price
            sale_price
            sku
        images {
                alt
                src
            }
            purchasable
        }
        description
      dimensions {
            height
            length
            width
        }
      images {
            alt
            src
        }
      categories {
            slug
        }
        name
        purchasable
        sku
    }
}
`;

