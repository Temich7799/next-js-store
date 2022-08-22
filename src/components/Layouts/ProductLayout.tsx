import React, { useEffect, useState } from "react";
import Layout from "./MainLayout";
import { graphql } from "gatsby";
import styled from "styled-components";
import ProductGallery from "../Product/ProductGallery/ProductGallery";
import ProductAbout from "../Product/ProductAbout/ProductAbout";
import ProductDescription from "../Product/ProductDescription";
import useWindowDimensions from "../../services/hooks/useWindowDimensions";

const Main = styled.main<any>`
    margin-top: ${props => props.isMobile ? "125px" : "0"};
`;

const Content = styled.div`
    max-width: 1900px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 25px;
    padding: 5%;
    hr {
        width: fit-content;
        margin: 0;
    }
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

    const { deviceHeight, deviceWidth } = useWindowDimensions();
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => setIsMobile(deviceWidth < 820 ? true : false), [deviceWidth]);

    return (
        <Layout>
            <Main isMobile={isMobile}>
                <Content>
                    <ProductGallery data={data.wcProducts.images}></ProductGallery>
                    <ProductAbout data={data.wcProducts}></ProductAbout>
                    <ProductDescription data={data.wcProducts.description}></ProductDescription>
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
}`;

