import React, { createContext } from "react";
import styled from "styled-components";
import ProductAbout from "../Product/ProductAbout/ProductAbout";
import ProductDescription from "../Product/ProductDescription";
import ProductGallery from "../Product/ProductGallery/ProductGallery";
import { ProductGatsby } from "../../interfaces/InterfaceProduct";
import LastSeenProductsCarousel from "../Carousel/LastSeenProductsCarousel";
import OnSaleProductsCarousel from "../Carousel/OnSaleProductsCarousel";
import RelatedProductsCarousel from "../Carousel/RelatedProductsCarousel";

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

    const { data, compImages } = props;

    return (
        <ProductPageContext.Provider value={data}>
            <StyledProductsListPageContent>
                <ProductGallery compImages={compImages} />
                <ProductAbout />
                <ProductDescription />
                <OnSaleProductsCarousel maxItemsPerSlide={3} />
                <LastSeenProductsCarousel maxItemsPerSlide={3} />
                <RelatedProductsCarousel data={data} compImages={compImages} options={{ maxItemsPerSlide: 3 }} />
            </StyledProductsListPageContent >
        </ProductPageContext.Provider>
    )
}

export default ProductPageContent;