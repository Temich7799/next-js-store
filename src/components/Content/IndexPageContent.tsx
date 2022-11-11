import React from "react"
import styled from "styled-components";

import Carousel from "../Carousel/Carousel";
import BrandsCarousel from "./Carousel/BrandsCarousel";
import OnSaleProductsCarousel from "./Carousel/OnSaleProductsCarousel";

type IndexPageContentProps = {
    data: {
        content: {
            rendered: string
        }
    }
}

const StyledIndexPageContent = styled.div`
    max-width: 1700px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 50px;
    padding: 2.5%;
`;

const IndexPageContent = (props: IndexPageContentProps) => {

    const { data } = props;

    const images = [
        "https://admin.malinikids.com/wp-content/uploads/2022/10/2022-10-31-10.48.01-768x1024.jpg",
        "https://admin.malinikids.com/wp-content/uploads/2022/10/2022-10-31-10.48.01-768x1024.jpg",
        "https://admin.malinikids.com/wp-content/uploads/2022/10/2022-10-31-10.48.01-768x1024.jpg",
    ]

    return (
        <>
            <Carousel>
                {
                    images.map((src) => src && <img src={src} width="100%" />)
                }
            </Carousel>
            <BrandsCarousel />
            <OnSaleProductsCarousel />

        </>
    )

}

export default IndexPageContent