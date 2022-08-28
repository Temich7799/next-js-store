import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import Button from "./Button"

const StyledCarousel = styled.div<any>`
    max-width: ${props => props.maxWidth};
    text-align: center;
`;

const CarouselContent = styled.div<any>`
    ${props => props.showButtons && `
        display: grid;
        grid-template-columns: 0.5fr 4fr 0.5fr;
        justify-items:center;
        align-items: center;
    `}
`;

const CarouselSliderWrapper = styled.div`
    width: 100%;
    overflow: hidden;
`;

const CarouselSlider = styled.div<any>`
    position: relative;
    display: flex;
    column-gap: ${props => props.gap}px;
    transition: 1s;
`;

type CarouselProps = {
    title?: string
    maxWidth?: string
    carouselItemMax?: number
    showButtons?: boolean
    children: any
}

const Carousel = (props: CarouselProps) => {

    const {
        title,
        maxWidth = '100%',
        carouselItemMax = 1,
        showButtons = true,
        children,
    } = props;

    const [carouselSliderWidth, setcarouselSliderWidth] = useState<number>(0);
    const [carouselSliderClientWidth, setCarouselClientWidth] = useState<number>(0);
    const [carouselSliderPosition, setcarouselSliderPosition] = useState<number>(0);
    const [carouselItemWidth, setCarouselItemWidth] = useState<number>(0);
    const [carouselItemsGap, setCarouselItemsGap] = useState<number>(0);


    const carouselSlider = useRef<any>();

    useEffect(() => {
        setCarouselItemWidth(carouselSlider.current.firstChild.clientWidth);
        setCarouselClientWidth(carouselSlider.current.clientWidth);
    }, []);

    useEffect(() => {
        (carouselSliderWidth && carouselItemWidth)
            && setCarouselItemsGap(calcItemsGap(carouselSliderClientWidth, carouselItemWidth, carouselItemMax));
    }, [carouselSliderWidth]);

    useEffect(() => {
        setcarouselSliderWidth(carouselSlider.current.scrollWidth);
        setcarouselSliderPosition(carouselItemsGap / 2);
        carouselSlider.current.style.left = `${carouselItemsGap / 2}px`;
    }, [carouselItemsGap]);

    function calcItemsGap(sliderWidth: number, itemWidth: number, itemsCount: number): number {
        let gap = 0;
        do {
            gap = (sliderWidth - itemWidth * itemsCount) / 2;
            if (gap < 24) {
                gap = 0;
                itemsCount--;
            }
            else break;
        } while (gap < 24);
        return gap;
    }

    function buttonOnClickHandler(direction: string) {
        let newPosition: number;

        if (direction == 'right') newPosition = carouselSliderPosition - carouselSliderClientWidth;
        else newPosition = carouselSliderPosition + carouselSliderClientWidth;

        setcarouselSliderPosition(newPosition);
        carouselSlider.current.style.left = `${newPosition}px`;
    }

    return (
        <StyledCarousel maxWidth={maxWidth}>
            {title ? <h3>{title}</h3> : <></>}
            <CarouselContent showButtons={showButtons}>
                {showButtons && <Button buttonStyle="transparent" buttonSize="shrink" onClick={() => buttonOnClickHandler('left')}><b>{'<'}</b></Button>}
                <CarouselSliderWrapper>
                    <CarouselSlider ref={carouselSlider} gap={carouselItemsGap}>
                        {children}
                    </CarouselSlider>
                </CarouselSliderWrapper>
                {showButtons && <Button buttonStyle="transparent" buttonSize="shrink" onClick={() => buttonOnClickHandler('right')}><b>{'>'}</b></Button>}
            </CarouselContent>
        </StyledCarousel>
    )
}

export default Carousel;