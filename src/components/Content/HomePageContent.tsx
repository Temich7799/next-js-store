import React from "react"
import styled from "styled-components";
import NewArrivalsBlock from "../Blocks/NewArrivalsBlock";
import SaleBlock from "../Blocks/SaleBlock";
import BannerHomePage from "../Carousel/BannerHomePage";
import BrandsCarousel from "../Carousel/BrandsCarousel";
import LastSeenProductsCarousel from "../Carousel/LastSeenProductsCarousel";
import TileBlockMenuWrapper from "../Wrappers/TileBlockMenuWrapper";

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
            <BannerHomePage />
            <TileBlockMenuWrapper>
                <NewArrivalsBlock />
                <SaleBlock />
            </TileBlockMenuWrapper>
            <LastSeenProductsCarousel maxItemsPerSlide={4} />
            <BrandsCarousel />
            <StyledHomePageContent dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </>
    )

}

export default HomePageContent