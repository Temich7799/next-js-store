import React, { createContext, useContext } from "react";
import styled from "styled-components";
import ProductAbout from "../Products/ProductAbout/ProductAbout";
import ProductDescription from "../Products/ProductDescription";
import ProductGallery from "../Products/ProductGallery/ProductGallery";
import Carousel from "../Carousel";
import ProductThumb from "../Products/Thumbs/ProductThumb";
import { LangContext } from "../Layouts/Layout";
import { useRelatedProducts } from "../../services/hooks/graphql/useRelatedProducts";

type ProductPageContentProps = {
    data: Product
    gatsbyImages?: Map<number, string>
    relatedProductsIds?: Array<string>
}

type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    description: string
    stock_quantity: number | null
    stock_status: string
    related_products?: [Product]
    wordpress_id?: number
    id: string
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
            localFile?: object | any
        }
    ]
    image?: {
        src: string
        alt: string
    }
    categories: [
        {
            slug: string
        }
    ]
}

const StyledProductsPageContent = styled.div`
    max-width: 1900px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 25px;
    padding: 5%;
`;

export const PageContext: Product | any = createContext({});

const ProductPageContent = (props: ProductPageContentProps) => {

    const { language } = useContext(LangContext);
    const { CAROUSEL_RELATED_PRODUCTS_TITLE } = require(`../../languages/${language}/languages`);

    const { data, gatsbyImages, relatedProductsIds } = props;

    data.wordpress_id = parseInt(data.id);
    if (!data.image) data.image = data.images[0];

    const { data: relatedProductsData, loading, hasRelatedProducts } = useRelatedProducts(data.wordpress_id, relatedProductsIds);

    return (
        <PageContext.Provider value={data}>
            <StyledProductsPageContent>
                <ProductGallery />
                <ProductAbout />
                <ProductDescription />
                {
                    hasRelatedProducts &&
                    <Carousel title={CAROUSEL_RELATED_PRODUCTS_TITLE} isDataFetching={loading} carouselItemMax={3}>
                        {
                            relatedProductsData !== undefined && relatedProductsData.map((product: Product) => {

                                const productData = {
                                    ...product,
                                    wordpress_id: parseInt(product.id)
                                };

                                const gatsbyImage = gatsbyImages ? gatsbyImages.get(productData.wordpress_id) : undefined;

                                return <ProductThumb data={productData} gatsbyImage={gatsbyImage} key={product.id} />
                            })
                        }
                    </Carousel>
                }
            </StyledProductsPageContent >
        </PageContext.Provider>
    )
}

export default ProductPageContent;