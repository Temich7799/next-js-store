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
    data: {
        wcProducts: {
            categories: [{}]
            description: string
            dimensions: {
                height: string
                length: string
                width: string
            }
            images: [
                {
                    alt: string
                    src: string
                }
            ]
            name: string
            price: string
            purchasable: boolean
            related_products: [{}]
            sale_price: string
            sku: string
            wordpress_id: number
        }
        wcProductsReviews: {
            date_created: string
            product_id: number
            product_name: string
            review: string
            reviewer: string
            verified: boolean
        }
    }
}

const ProductLayout = (props: ProductProps) => {

    const { data } = props;

    return (
        <Layout>
            <Main>
                <ProductGallery data={data.wcProducts.images}></ProductGallery>
                <ProductAbout data={data.wcProducts}></ProductAbout>
                <ProductDescription data={data.wcProducts.description}></ProductDescription>
                <hr />
                <ProductReviews data={data.wcProductsReviews}></ProductReviews>
            </Main>
        </Layout>
    )
}

export default ProductLayout

export const query = graphql`
  query getProduct($productId: Int!){
    wcProducts(wordpress_id: {eq: $productId}) {
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
        on_sale
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
        wordpress_id
    }
    wcProductsReviews(product_id: {eq: $productId}) {
        date_created
        product_name
        review
        reviewer
        verified
        product_id
    }
}`;

