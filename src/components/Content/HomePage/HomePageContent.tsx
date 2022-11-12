import React from "react"
import styled from "styled-components";
import BrandsCarousel from "./Carousel/BrandsCarousel";
import OnSaleProductsCarousel from "./Carousel/OnSaleProductsCarousel";

type HomePageContentProps = {
    data: {
        content: {
            rendered: string
        }
    }
}

const StyledHomePageContent = styled.div`
    max-width: 1700px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 50px;
    padding: 2.5%;
`;

const HomePageContent = (props: HomePageContentProps) => {

    const { data } = props;

    return (
        <>
            <BrandsCarousel />
            <OnSaleProductsCarousel />
        </>
    )

}

export default HomePageContent