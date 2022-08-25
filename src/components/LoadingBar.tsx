import React from "react"
import styled, { keyframes } from "styled-components"

const spinnerAnimation = keyframes`
    0% {transform: rotate(0deg)}
    100% {transform: rotate(360deg)}
`;

const StyledLoadingBar = styled.div`
    width: 25px;
    height: 25px;
    border: 2.5px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${spinnerAnimation} 1.1s infinite linear;
`;

const LoadingBar = () => {
    return (
        <>
            <StyledLoadingBar />
        </>
    )
}

export default LoadingBar; 