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
    speed?: string
    maxWidth?: string
    carouselItemMax?: number
    minGap?: number
    showButtons?: boolean
    showGap?: boolean
    children: any
}

const Carousel = (props: CarouselProps) => {

    const {
        title,
        speed = '750ms',
        maxWidth = '100%',
        carouselItemMax = 10,
        minGap = 24,
        showButtons = true,
        showGap = true,
        children,
    } = props;

    const [sliderClientWidth, setSliderClientWidth] = useState<number>(0);
    const [itemWidth, setItemWidth] = useState<number>(0);
    const [itemsGap, setItemsGap] = useState<number>(0);
    const [positions, setPositions] = useState<Array<number>>([]);

    const carouselSlider = useRef<any>();
    const carouselWrapper = useRef<any>();

    const slider = useRef<any>();
    slider.current = {
        isMouseDown: false,
        slideStartPos: 0,
        position: 0,
        positionsMap: positions ? positions : [],
        positionIndex: 0,
    };

    const sliderClientWidthObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
            setSliderClientWidth(entry.borderBoxSize[0].inlineSize);
        }
    });

    useEffect(() => {
        setItemWidth(carouselSlider.current.firstChild.clientWidth);

        sliderClientWidthObserver.observe(carouselSlider.current);

        carouselWrapper.current.addEventListener('mousemove', (onMouseMoveEvent: any) => sliderOnMouseMoveHandler(onMouseMoveEvent));
        carouselWrapper.current.addEventListener('mousedown', sliderOnMouseDownHandler);
        window.addEventListener('mouseup', windowOnMouseUpHandler);

        carouselWrapper.current.addEventListener('touchmove', (onTouchMoveEvent: any) => sliderOnMouseMoveHandler(onTouchMoveEvent));
        carouselWrapper.current.addEventListener('touchstart', sliderOnMouseDownHandler);
        window.addEventListener('touchend', windowOnMouseUpHandler);
    }, []);

    useEffect(() => {

        showGap == true
            ? itemWidth && setItemsGap(
                carouselSlider.current.clientWidth < carouselSlider.current.scrollWidth
                    ? calcItemsGap(carouselSlider.current.clientWidth, itemWidth, carouselItemMax)
                    : minGap
            )
            : itemsGap;

    }, [itemWidth, sliderClientWidth]);

    useEffect(() => {

        slider.current.positionsMap = makePositionsMap(carouselSlider.current.clientWidth < carouselSlider.current.scrollWidth ? itemsGap / 2 : 0);
        setPositions(slider.current.positionsMap);
        slider.current.positionIndex = 0;
        slider.current.position = slider.current.positionsMap[slider.current.positionIndex];

        carouselSlider.current.style.left = `${slider.current.position}px`;

    }, [itemsGap, sliderClientWidth]);

    function sliderOnMouseMoveHandler(onMouseMoveEvent: any): void {
        onMouseMoveEvent.cancelable && onMouseMoveEvent.preventDefault();
        if (slider.current.isMouseDown == true) {
            slider.current.position += onMouseMoveEvent.movementX;
            carouselSlider.current.style = `left: ${slider.current.position}px; transition: none;`;
        }
    }

    function sliderOnMouseDownHandler(): void {
        slider.current.isMouseDown = true;
        slider.current.slideStartPos = slider.current.position;
    }

    function windowOnMouseUpHandler(): void {

        if (slider.current.isMouseDown == true) {

            makeSwipe(slider.current.position > slider.current.slideStartPos ? 'left' : 'right');
            slider.current.slideStartPos = 0;

            carouselSlider.current.style.transition = `${speed}`;
        }
        slider.current.isMouseDown = false;
    }

    function calcItemsGap(sliderWidth: number, itemWidth: number, itemsCount: number): number {
        let gap = 0;
        do {
            gap = (sliderWidth - itemWidth * itemsCount) / itemsCount;
            if (gap < minGap) {
                gap = 0;
                itemsCount--;
            }
            else break;
        } while (gap < minGap);
        return gap;
    }

    function makeSwipe(direction: string): void {

        slider.current.position = slider.current.positionsMap[
            direction == 'left'
                ? slider.current.positionsMap[--slider.current.positionIndex] == undefined
                    ? ++slider.current.positionIndex
                    : slider.current.positionIndex
                : slider.current.positionsMap[++slider.current.positionIndex] == undefined
                    ? --slider.current.positionIndex
                    : slider.current.positionIndex];

        carouselSlider.current.style = `left: ${slider.current.position}px; transition: ${speed};`;
    }

    function makePositionsMap(startFrom: number): Array<number> {
        let array = [];
        do {
            array.push(startFrom);
            startFrom -= carouselSlider.current.clientWidth;
        } while (carouselSlider.current.clientWidth && startFrom > 0 - carouselSlider.current.scrollWidth);
        return array;
    }

    return (
        <StyledCarousel maxWidth={maxWidth}>
            {title ? <h3>{title}</h3> : <></>}
            <CarouselContent showButtons={showButtons}>
                {showButtons && <Button buttonStyle="transparent" buttonSize="shrink" onClick={() => makeSwipe('left')}><b>{'<'}</b></Button>}
                <CarouselSliderWrapper ref={carouselWrapper}>
                    <CarouselSlider ref={carouselSlider} gap={itemsGap}>
                        {children}
                    </CarouselSlider>
                </CarouselSliderWrapper>
                {showButtons && <Button buttonStyle="transparent" buttonSize="shrink" onClick={() => makeSwipe('right')}><b>{'>'}</b></Button>}
            </CarouselContent>
        </StyledCarousel >
    )
}

export default Carousel;