import React, { useEffect, useRef, useState } from "react"
import ResizeObserver from "resize-observer-polyfill";
import styled from "styled-components"
import useMobile from "../services/hooks/useMobile";
import Button from "./Buttons/Button"
import LoadingBar from "./LoadingBars/LoadingBar";

type CarouselProps = {
    title?: string
    speed?: string
    maxWidth?: string
    carouselItemMax?: number
    minGap?: number
    showButtons?: boolean
    showGap?: boolean
    isDataFetching?: boolean
    children: any
}

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

const LoaderWrapper = styled.div`
    width: 50vw;    
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Carousel = (props: CarouselProps) => {

    const {
        title,
        speed = '750ms',
        maxWidth = '100%',
        carouselItemMax = 10,
        minGap = 24,
        showButtons = true,
        showGap = true,
        isDataFetching = false,
        children,
    } = props;

    let pointerType = useMobile() ? 'pointer' : 'mouse';
    let eventEndType = useMobile() ? 'cancel' : 'up';

    const [sliderClientWidth, setSliderClientWidth] = useState<number>(0);
    const [itemWidth, setItemWidth] = useState<number>(0);
    const [itemsGap, setItemsGap] = useState<number>(0);
    const [positions, setPositions] = useState<Array<number>>([]);

    const carouselSlider = useRef<any>();
    const carouselWrapper = useRef<any>();

    const slider = useRef<any>();
    slider.current = {
        isPointerDown: false,
        prevPosition: 0,
        position: 0,
        positionsMap: positions ? positions : [],
        positionIndex: 0,
    };

    useEffect(() => {

        if (children) {

            setItemWidth(carouselSlider.current.firstChild.clientWidth);

            const sliderClientWidthObserver = new ResizeObserver((entries) => {
                for (let entry of entries) {
                    setSliderClientWidth(entry.contentRect.width);
                }
            });

            sliderClientWidthObserver.observe(carouselSlider.current);

            carouselWrapper.current.addEventListener(`${pointerType}down`, onPointerDownHandler);
            window.addEventListener(`${pointerType}${eventEndType}`, onPointerUpHandler);
        }
        //return () => carouselWrapper.current.removeEventListener(`${pointerType}down`, onPointerDownHandler);
    }, [children]);

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

        if (isDataFetching === false) {

            slider.current.positionsMap = makePositionsMap(carouselSlider.current.clientWidth < carouselSlider.current.scrollWidth ? itemsGap / 2 : 0);
            setPositions(slider.current.positionsMap);
            slider.current.positionIndex = 0;
            slider.current.position = slider.current.positionsMap[slider.current.positionIndex];

            carouselSlider.current.style.left = `${slider.current.position}px`;
        }
    }, [itemsGap, sliderClientWidth]);

    function onPointerDownHandler(): void {

        carouselWrapper.current.addEventListener(`${pointerType}move`, onPointerMoveHandler);

        slider.current.prevPosition = slider.current.position;
    }

    function onPointerMoveHandler(onPointerMoveEvent: any): void {

        onPointerMoveEvent.cancelable && onPointerMoveEvent.preventDefault();

        slider.current.position += onPointerMoveEvent.movementX;
        carouselSlider.current.style = `left: ${slider.current.position}px; transition: none;`;
    }

    function onPointerUpHandler(): void {

        if (slider.current.position !== slider.current.prevPosition) {
            makeSwipe(slider.current.position > slider.current.prevPosition ? 'left' : 'right');
            slider.current.prevPosition = 0;
        }

        if (carouselSlider.current) carouselSlider.current.style.transition = `${speed}`;

        carouselWrapper.current.removeEventListener(`${pointerType}move`, onPointerMoveHandler);
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
        } while (gap < minGap && itemsCount > 0);

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
                {
                    isDataFetching
                        ?
                        <LoaderWrapper>
                            <LoadingBar size="50%" />
                        </LoaderWrapper>
                        :
                        <CarouselSliderWrapper ref={carouselWrapper}>
                            {
                                <CarouselSlider ref={carouselSlider} gap={itemsGap}>
                                    {children}
                                </CarouselSlider>
                            }
                        </CarouselSliderWrapper>
                }
                {showButtons && <Button buttonStyle="transparent" buttonSize="shrink" onClick={() => makeSwipe('right')}><b>{'>'}</b></Button>}
            </CarouselContent>
        </StyledCarousel >
    )
}

export default Carousel;