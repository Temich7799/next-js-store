import React from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import styled from "styled-components";
import ProductGallery from "../Product/ProductGallery/ProductGallery";
import ProductAbout from "../Product/ProductAbout/ProductAbout";
import ProductDescription from "../Product/ProductDescription";
import Carousel from "../Carousel";
import ProductThumb from "../Product/Thumbs/ProductThumb";
import useMobile from "../../services/hooks/useMobile";
import { CAROUSEL_RELATED_PRODUCTS_TITLE } from "../../languages/ru/languages";

const Main = styled.main<any>`
    margin-top: ${props => props.isMobile ? "125px" : "0"};
`;

const Content = styled.div`
    max-width: 1900px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 25px;
    padding: 5%;
`;

type ProductAttribute = {
    options: [string]
    name: string
}

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
            attributes: [ProductAttribute]
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
            slug: string
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

    const isMobile = useMobile();

    return (
        <Layout>
            <Main isMobile={isMobile}>
                <Content>
                    <ProductGallery data={data.wcProducts.images}></ProductGallery>
                    <ProductAbout data={data.wcProducts}></ProductAbout>
                    <ProductDescription data={data.wcProducts.description}></ProductDescription>
                    <Carousel title={CAROUSEL_RELATED_PRODUCTS_TITLE} carouselItemMax={3}>
                        <ProductThumb data={data.wcProducts.related_products[0]} />
                        <ProductThumb data={data.wcProducts.related_products[0]} />
                        <ProductThumb data={data.wcProducts.related_products[0]} />
                        <ProductThumb data={data.wcProducts.related_products[0]} />
                    </Carousel>
                </Content>
            </Main>
        </Layout>
    )
}

export default ProductLayout

export const query = graphql`
  query getProduct($productId: Int!){
    wcProducts(wordpress_id: {eq: $productId}) {
        attributes {
            options
            name
      }
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
            localFile {
                childImageSharp {
                    gatsbyImageData(
                        webpOptions: {quality: 85}
                        height: 240
                    )
                }
            }
        }
        categories {
            slug
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
            localFile {
                childImageSharp {
                    gatsbyImageData(
                        webpOptions: {quality: 85}
                        height: 100
                        width: 100
                        transformOptions: {cropFocus: CENTER}
                    )
                }
            }
        }
        categories {
            slug
        }
        name
        purchasable
        sku
        wordpress_id
    }
}`;

