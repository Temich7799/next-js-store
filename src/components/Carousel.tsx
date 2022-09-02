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

    const [sliderClientWidth, setSliderClientWidth] = useState<number>(0);
    const [itemWidth, setItemWidth] = useState<number>(0);
    const [itemsGap, setItemsGap] = useState<number>(0);

    const carouselSlider = useRef<any>();
    const carouselWrapper = useRef<any>();
    const slider = useRef<any>();
    slider.current = {
        isMoving: false,
        position: 0,
        startMargin: 0
    };

    const sliderClientWidthObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            setSliderClientWidth(entry.borderBoxSize[0].inlineSize)
        }
    });

    useEffect(() => {
        setItemWidth(carouselSlider.current.firstChild.clientWidth);

        sliderClientWidthObserver.observe(carouselSlider.current);

        carouselWrapper.current.addEventListener('mousemove', (onMouseMoveEvent: any) => sliderOnMouseMoveHandler(onMouseMoveEvent));
        carouselWrapper.current.addEventListener('mousedown', sliderOnMouseDownHandler);
        window.addEventListener('mouseup', windowOnMouseUpHandler);

        carouselWrapper.current.addEventListener('touchmove', (onMouseMoveEvent: any) => sliderOnMouseMoveHandler(onMouseMoveEvent));
        carouselWrapper.current.addEventListener('touchstart', sliderOnMouseDownHandler);
        window.addEventListener('touchend', windowOnMouseUpHandler);
    }, []);

    useEffect(() => {
        itemWidth && setItemsGap(
            carouselSlider.current.clientWidth < carouselSlider.current.scrollWidth
                ? calcItemsGap(carouselSlider.current.clientWidth, itemWidth, carouselItemMax)
                : 24
        );
    }, [itemWidth, sliderClientWidth]);

    useEffect(() => {
        slider.current.position = carouselSlider.current.clientWidth < carouselSlider.current.scrollWidth ? itemsGap / 2 : 0;
        carouselSlider.current.style.left = `${slider.current.position}px`;
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

    function buttonOnClickHandler(direction: string | number) {

        if (direction == 'right') slider.current.position = slider.current.position - carouselSlider.current.clientWidth;
        else slider.current.position = slider.current.position + carouselSlider.current.clientWidth;

        carouselSlider.current.style.left = `${slider.current.position}px`;
        carouselSlider.current.style.transition = `750ms`;
    }

    function sliderOnMouseMoveHandler(onMouseMoveEvent: any) {
        onMouseMoveEvent.preventDefault();
        if (slider.current.isMouseDown == true) {
            slider.current.position += onMouseMoveEvent.movementX;
            carouselSlider.current.style = `left: ${slider.current.position}px; transition: none;`;
        }
    }

    function sliderOnMouseDownHandler() {
        slider.current.isMouseDown = true;
    }

    function windowOnMouseUpHandler() {
        if (slider.current.isMouseDown == true) carouselSlider.current.style.transition = `750ms`;
        slider.current.isMouseDown = false;
    }

    return (
        <StyledCarousel maxWidth={maxWidth}>
            {title ? <h3>{title}</h3> : <></>}
            <CarouselContent showButtons={showButtons}>
                {showButtons && <Button buttonStyle="transparent" buttonSize="shrink" onClick={() => buttonOnClickHandler('left')}><b>{'<'}</b></Button>}
                <CarouselSliderWrapper ref={carouselWrapper}>
                    <CarouselSlider ref={carouselSlider} gap={itemsGap}>
                        {children}
                    </CarouselSlider>
                </CarouselSliderWrapper>
                {showButtons && <Button buttonStyle="transparent" buttonSize="shrink" onClick={() => buttonOnClickHandler('right')}><b>{'>'}</b></Button>}
            </CarouselContent>
        </StyledCarousel >
    )
}

export default Carousel;