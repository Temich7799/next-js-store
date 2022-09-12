import React, { useEffect } from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import styled from "styled-components";
import ProductGallery from "../Products/ProductGallery/ProductGallery";
import ProductAbout from "../Products/ProductAbout/ProductAbout";
import ProductDescription from "../Products/ProductDescription";
import Carousel from "../Carousel";
import ProductThumb from "../Products/Thumbs/ProductThumb";
import useMobile from "../../services/hooks/useMobile";
import { CAROUSEL_RELATED_PRODUCTS_TITLE } from "../../languages/ru/languages";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_WP_RELATED_PRODUCTS } from "../../graphql/queries/getAllWpRelatedProducts";
import { GET_ALL_WP_RELATED_PRODUCTS_IDS } from "../../graphql/queries/getAllWpRelatedProductsIds";

type Product = {
    name: string
    slug: string
    sku: string
    price: string
    sale_price: string
    description: string
    wordpress_id: number
    stock_quantity?: number | null
    stock_status?: string
    related_products: [Product]
    attributes: [
        {
            options: [string]
            name: string
        }
    ]
    images: [
        {
            src: string
            alt: string
            localFile: object | any
        }
    ]
    image: {
        src: string
        alt: string
    }
    categories: [
        {
            slug: string
        }
    ]
}

type ProductProps = {
    data: {
        wcProducts: Product
    }
}

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

const ProductLayout = (props: ProductProps) => {

    const { data } = props;
    data.wcProducts.image.src = data.wcProducts.images[0].src;
    data.wcProducts.image.alt = data.wcProducts.images[0].alt;

    const isMobile = useMobile();

    const gatsbyImages = new Map<number, string>();

    data.wcProducts.related_products.forEach((relatedProduct: object | any) => {
        if ((relatedProduct.stock_quantity !== null && relatedProduct.stock_quantity > 0) || relatedProduct.stock_status == 'instock') {
            gatsbyImages.set(relatedProduct.wordpress_id, relatedProduct.images[0].localFile.childImageSharp.gatsbyImageData.images.fallback.src);
        }
    });

    const [getAllWpRelatedProductsIds] = useLazyQuery(GET_ALL_WP_RELATED_PRODUCTS_IDS, { variables: { productId: data.wcProducts.wordpress_id } });
    //const [getAllWpRelatedProducts] = useLazyQuery(GET_ALL_WP_RELATED_PRODUCTS);

    useEffect(() => {
        getAllWpRelatedProductsIds()
            .then((response) => {
                console.log(response.data)
            });
    }, []);

    return (
        <Layout>
            <Main isMobile={isMobile}>
                <Content>
                    <ProductGallery data={data.wcProducts.images}></ProductGallery>
                    <ProductAbout data={data.wcProducts}></ProductAbout>
                    <ProductDescription data={data.wcProducts.description}></ProductDescription>
                    {
                        /*
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
                            */
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
        description
        wordpress_id
        attributes {
            options
            name
        }
        related_products {
            stock_quantity
            stock_status
            wordpress_id
            images {
                alt
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
            src
            alt
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

