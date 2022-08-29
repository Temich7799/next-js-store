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
        carouselItemMax = 10,
        showButtons = true,
        children,
    } = props;

    const [sliderWidth, setSliderWidth] = useState<number>(0);
    const [sliderClientWidth, setSliderClientWidth] = useState<number>(0);
    const [sliderPosition, setSliderPosition] = useState<number>(0);
    const [itemWidth, setItemWidth] = useState<number>(0);
    const [itemsGap, setItemsGap] = useState<number>(0);

    const carouselSlider = useRef<any>();

    useEffect(() => {
        setItemWidth(carouselSlider.current.firstChild.clientWidth);
        setSliderClientWidth(carouselSlider.current.clientWidth);
    }, []);

    useEffect(() => {
        (sliderWidth && itemWidth)
            && setItemsGap(calcItemsGap(sliderClientWidth, itemWidth, carouselItemMax));
    }, [sliderWidth]);

    useEffect(() => {
        setSliderWidth(carouselSlider.current.scrollWidth);
        setSliderPosition(itemsGap / 2);
        carouselSlider.current.style.left = `${itemsGap / 2}px`;
    }, [itemsGap]);

    function calcItemsGap(sliderWidth: number, itemWidth: number, itemsCount: number): number {
        let gap = 0;
        do {
            gap = (sliderWidth - itemWidth * itemsCount) / itemsCount;
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

        if (direction == 'right') newPosition = sliderPosition - sliderClientWidth;
        else newPosition = sliderPosition + sliderClientWidth;

        setSliderPosition(newPosition);
        carouselSlider.current.style.left = `${newPosition}px`;
    }

    return (
        <StyledCarousel maxWidth={maxWidth}>
            {title ? <h3>{title}</h3> : <></>}
            <CarouselContent showButtons={showButtons}>
                {showButtons && <Button buttonStyle="transparent" buttonSize="shrink" onClick={() => buttonOnClickHandler('left')}><b>{'<'}</b></Button>}
                <CarouselSliderWrapper>
                    <CarouselSlider ref={carouselSlider} gap={itemsGap}>
                        {children}
                    </CarouselSlider>
                </CarouselSliderWrapper>
                {showButtons && <Button buttonStyle="transparent" buttonSize="shrink" onClick={() => buttonOnClickHandler('right')}><b>{'>'}</b></Button>}
            </CarouselContent>
        </StyledCarousel>
    )
}

export default Carousel;