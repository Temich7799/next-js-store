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

type Product = {
    description: string
    attributes: [
        {
            options: [string]
            name: string
        }
    ]
    images: [
        {
            alt: string
            src: string
            localFile: object
        }
    ]
    categories: [
        {
            slug: string
        }
    ]
    name: string
    price: string
    purchasable: boolean
    related_products: [Product]
    sale_price: string
    sku: string
    slug: string
    wordpress_id: number
    quantity: number
}

type ProductProps = {
    data: {
        wcProducts: Product
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
                    {
                        data.wcProducts.related_products.length
                            ?
                            <Carousel title={CAROUSEL_RELATED_PRODUCTS_TITLE} carouselItemMax={3}>
                                {
                                    data.wcProducts.related_products.map((relatedProduct: Product) =>
                                        <ProductThumb
                                            data={relatedProduct}
                                            absolutePath={`${document.location.origin}/catalog/${relatedProduct.categories[0].slug}/${relatedProduct.categories[0].slug}-${relatedProduct.sku != '' ? relatedProduct.sku : relatedProduct.wordpress_id}`}
                                            key={relatedProduct.wordpress_id}
                                        />
                                    )
                                }
                            </Carousel>
                            : <></>
                    }
                </Content>
            </Main>
        </Layout >
    )
}

export default ProductLayout

export const query = graphql`
  query getProduct($productId: Int!){
    wcProducts(wordpress_id: {eq: $productId}) {
        name
        sku
        price
        sale_price
        purchasable
        description
        wordpress_id
        attributes {
            options
            name
        }
        related_products {
            name
            price
            sale_price
            sku
            wordpress_id
            purchasable
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
    }
}`;

