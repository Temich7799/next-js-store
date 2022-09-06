import React from "react"
import styled, { keyframes } from "styled-components"

const spinnerAnimation = keyframes`
    0% {transform: rotate(0deg)}
    100% {transform: rotate(360deg)}
`;

type LoadingBarProps = {
    size?: string
}

const StyledLoadingBar = styled.div<LoadingBarProps>`
    height: ${props => props.size};
    min-height: 10px;
    aspect-ratio: 1/1;
    border: 2.5px solid #2deb6c;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${spinnerAnimation} 1.1s infinite linear;
`;

const LoadingBar = (props: LoadingBarProps) => {

    const { size = '50%' } = props;

    return (
        <>
            <StyledLoadingBar size={size} />
        </>
    )
}

export default LoadingBar; 