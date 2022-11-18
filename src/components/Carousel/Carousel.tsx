import React, { useEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";
import styled from "styled-components";
import { CarouselProps } from "../../types/CarouselPropsType";
import Button from "../Buttons/Button";
import CopyProtectedWrapper from "../Wrappers/CopyProtectedWrapper";
import LoadingBar from "../LoadingBars/LoadingBar";

const StyledCarousel = styled.div<any>`
    max-width: ${props => props.maxWidth};
    margin: ${props => props.mode === 'fullSize' ? 0 : '5%'} auto;
    text-align: center;
    overflow: hidden;
`;

const CarouselContent = styled.div<any>`
    width: fit-content;
    margin: 0 auto;
    ${props => props.mode !== 'fullSize'
        ?
        `
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            justify-items:center;
            align-items: center;
            gap: 5px;
        `
        :
        `
            position: relative;
            button {
                position: absolute;
                top: 50%;
                z-index: 100;
                left: 97.5vw;
                :nth-child(1) {
                    left: 1vw;
                }
                @media (max-width: 820px) {
                    display: none;
                }
            }
        `}
`;

const CarouselSliderWrapper = styled.div<any>`
    margin: ${props => props.mode === 'fullSize' ? 0 : '15px 0'};
    width: 100%;
    overflow: hidden;
`;

const CarouselSlider = styled.div<any>`
    touch-action: pan-y;
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
        maxWidth = '100%',
        isDataFetching = false,
        options = {},
        children,
    } = props;

    const {
        animationSpeed = '750ms',
        maxItemsPerSlide = 10,
        mode,
        minGap = mode === 'fullSize' ? 0 : 24,
    } = options;

    const [sliderClientWidth, setSliderClientWidth] = useState<number>(0);
    const [itemWidth, setItemWidth] = useState<number>(0);
    const [itemsGap, setItemsGap] = useState<number>(0);
    const [positions, setPositions] = useState<Array<number>>([]);

    const showButtons = true;

    const carouselSlider = useRef<any>();
    const carouselWrapper = useRef<any>();

    const slider = useRef<any>();
    slider.current = {
        isPointerDown: false,
        prevPosition: 0,
        prevClientX: 0,
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

            carouselWrapper.current.addEventListener('pointerdown', onPointerDownHandler);
        }
        //return () => carouselWrapper.current.removeEventListener(`${pointerType}down`, onPointerDownHandler);
    }, [children]);

    useEffect(() => {

        itemWidth && setItemsGap(
            carouselSlider.current.clientWidth <= carouselSlider.current.scrollWidth
                ? calcItemsGap(carouselSlider.current.clientWidth, itemWidth, maxItemsPerSlide)
                : minGap
        )
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

    function onPointerDownHandler(pointerDownEvent: any): void {

        pointerDownEvent.stopPropagation();
        pointerDownEvent.preventDefault();

        slider.current.prevClientX = pointerDownEvent.clientX;

        carouselWrapper.current.addEventListener('pointermove', onPointerMoveHandler);
        window.addEventListener('pointerup', onPointerUpHandler, { once: true });
        carouselWrapper.current.addEventListener('pointercancel', onPointerUpHandler, { once: true });

        slider.current.prevPosition = slider.current.position;
    }

    function onPointerMoveHandler(onPointerMoveEvent: any): void {

        onPointerMoveEvent.stopPropagation();
        onPointerMoveEvent.cancelable && onPointerMoveEvent.preventDefault();

        const movementX = onPointerMoveEvent.clientX - slider.current.prevClientX;

        slider.current.position += movementX;
        slider.current.prevClientX = onPointerMoveEvent.clientX;

        carouselSlider.current.style = `left: ${slider.current.position}px; transition: none;`;
    }

    function onPointerUpHandler(onPointerUpEvent: any): void {

        onPointerUpEvent.stopPropagation();
        onPointerUpEvent.preventDefault();

        if (slider.current.position !== slider.current.prevPosition) {
            makeSwipe(slider.current.position > slider.current.prevPosition ? 'left' : 'right');
            slider.current.prevPosition = 0;
        }

        if (carouselSlider.current !== null) carouselSlider.current.style.transition = `${animationSpeed}`;

        carouselWrapper.current !== null && carouselWrapper.current.removeEventListener('pointermove', onPointerMoveHandler);
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

        if (carouselSlider.current) carouselSlider.current.style = `left: ${slider.current.position}px; transition: ${animationSpeed};`;
    }

    function makePositionsMap(startFrom: number): Array<number> {

        let array = [];

        if (mode === 'fullSize') {
            children.forEach((item: any) => {
                array.push(startFrom);
                startFrom -= carouselSlider.current.firstChild.clientWidth;
            });
        }
        else {
            do {
                array.push(startFrom);
                startFrom -= carouselSlider.current.clientWidth;
            } while (carouselSlider.current.clientWidth && startFrom > 0 - carouselSlider.current.scrollWidth);
        }

        return array;
    }

    return (
        <StyledCarousel maxWidth={maxWidth} mode={mode}>
            {
                title &&
                <CopyProtectedWrapper>
                    <h3>{title}</h3>
                </CopyProtectedWrapper>
            }
            <CarouselContent mode={mode}>
                {showButtons && <Button buttonStyle="transparent" buttonSize="shrink" onClick={() => makeSwipe('left')}>{'<'}</Button>}
                {
                    isDataFetching
                        ?
                        <LoaderWrapper>
                            <LoadingBar size="50%" />
                        </LoaderWrapper>
                        :
                        <CarouselSliderWrapper ref={carouselWrapper} mode={mode}>
                            {
                                <CarouselSlider ref={carouselSlider} gap={itemsGap}>
                                    {children}
                                </CarouselSlider>
                            }
                        </CarouselSliderWrapper>
                }
                {showButtons && <Button buttonStyle="transparent" buttonSize="shrink" onClick={() => makeSwipe('right')}>{'>'}</Button>}
            </CarouselContent>
        </StyledCarousel >
    )
}

export default Carousel;