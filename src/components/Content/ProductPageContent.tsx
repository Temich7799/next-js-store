import React, { createContext, useContext } from "react";
import styled from "styled-components";
import ProductAbout from "../Product/ProductAbout/ProductAbout";
import ProductDescription from "../Product/ProductDescription";
import ProductGallery from "../Product/ProductGallery/ProductGallery";
import { LangContext } from "../Layouts/Layout";
import { ProductGatsby } from "../../interfaces/InterfaceProduct";
import CarouselWithProducts from "../Carousel/CarouselWithFetchedProducts";

type ProductPageContentProps = {
    data: ProductGatsby
    compImages?: any | undefined
}

const StyledProductsListPageContent = styled.div`
    max-width: 1900px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 25px;
    padding: 5%;
`;

export const ProductPageContext: React.Context<ProductGatsby> = createContext({});

const ProductPageContent = (props: ProductPageContentProps) => {

    const { language } = useContext(LangContext);
    const { CAROUSEL_RELATED_PRODUCTS_TITLE } = require(`../../languages/${language}/languages`);

    const { data, compImages } = props;

    return (
        <ProductPageContext.Provider value={data}>
            <StyledProductsListPageContent>
                <ProductGallery compImages={compImages} />
                <ProductAbout />
                <ProductDescription />
                {
                    data && data.related_ids.length > 0 &&
                    <CarouselWithProducts
                        title={CAROUSEL_RELATED_PRODUCTS_TITLE}
                        params={{ include: data && data.related_ids }}
                        compImages={compImages}
                    />
                }
            </StyledProductsListPageContent >
        </ProductPageContext.Provider>
    )
}

export default ProductPageContent;