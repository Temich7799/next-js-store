import React from "react"
import styled from "styled-components";
import NewArrivalsBlock from "../components/Blocks/NewArrivalsBlock";
import SaleBlock from "../components/Blocks/SaleBlock";
import BannerHomePage from "../components/Carousel/BannerHomePage";
import BrandsCarousel from "../components/Carousel/BrandsCarousel";
import LastSeenProductsCarousel from "../components/Carousel/LastSeenProductsCarousel";
import TileBlockMenuWrapper from "../components/Wrappers/TileBlockMenuWrapper";

type HomePageTemplateProps = {
    data: string
}

const StyledHomePageTemplate = styled.div`
    max-width: 1700px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 50px;
    padding: 2.5%;
`;

const HomePageTemplate = (props: HomePageTemplateProps) => {

    const { data } = props;

    return (
        <>
            <BannerHomePage />
            <TileBlockMenuWrapper>
                <NewArrivalsBlock />
                <SaleBlock />
            </TileBlockMenuWrapper>
            <LastSeenProductsCarousel maxItemsPerSlide={4} />
            <BrandsCarousel maxItemsPerSlide={3} />
            <StyledHomePageTemplate dangerouslySetInnerHTML={{ __html: data }} />
        </>
    )

}

export default HomePageTemplate