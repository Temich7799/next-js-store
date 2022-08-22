import React from "react"
import styled from "styled-components"
import ImageSVG from "./ImageSVG";

const StyledCarousel = styled.div`
    position: relative;
    width: 70%;
    min-width: 300px;
    height: min-content;
    position: relative;
    text-align: center;
`;

const CarouselContent = styled.div`
    display:grid;
    grid-template-columns: 1fr 4fr 1fr;
    justify-content: center;
    justify-items: center;
    align-items: center;
`;

const CarouselItems = styled.div`
    width: 100%;
    padding: 10px;
    height: fit-content;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    overflow: auto;
`;

const ArrowLeft = styled.div`
    width: fit-content;
    height: fit-content;
    transform: rotate(-90deg);
    border: red solid 1px;
`;

const ArrowRight = styled(ArrowLeft)`
    transform: rotate(90deg);
`;

type CarouselProps = {
    title: string
    carouselItemComponent: Function
    dataForItem: Array<object>
}

const Carousel = (props: CarouselProps) => {

    const { title, carouselItemComponent, dataForItem } = props;

    return (
        <StyledCarousel>
            <h3>{title}</h3>
            <CarouselContent>
                <ArrowLeft><ImageSVG path="svg/arrow_more.svg/" height="25px" width="25px" /></ArrowLeft>
                <CarouselItems>
                    {
                        dataForItem.map((carouselItem) =>
                            carouselItemComponent({ data: carouselItem })
                        )
                    }
                </CarouselItems>
                <ArrowRight><ImageSVG path="svg/arrow_more.svg/" height="25px" width="25px" /></ArrowRight>
            </CarouselContent>
        </StyledCarousel>
    )
}

export default Carousel;