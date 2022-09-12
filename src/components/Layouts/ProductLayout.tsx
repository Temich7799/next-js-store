import React from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import styled from "styled-components";
import useMobile from "../../services/hooks/useMobile";
import ProductPageContent from "../Products/ProductPageContent";

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

const ProductLayout = (props: ProductProps) => {

    const { data } = props;
    if (data.wcProducts.image) {
        data.wcProducts.image.src = data.wcProducts.images[0].src;
        data.wcProducts.image.alt = data.wcProducts.images[0].alt;
    }

    const isMobile = useMobile();

    const gatsbyImages = new Map<number, string>();

    data.wcProducts.related_products.forEach((relatedProduct: object | any) => {
        if ((relatedProduct.stock_quantity !== null && relatedProduct.stock_quantity > 0) || relatedProduct.stock_status == 'instock') {
            gatsbyImages.set(relatedProduct.wordpress_id, relatedProduct.images[0].localFile.childImageSharp.gatsbyImageData.images.fallback.src);
        }
    });

    return (
        <Layout>
            <Main isMobile={isMobile}>
                <ProductPageContent data={data.wcProducts} gatsbyImages={gatsbyImages} />
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

