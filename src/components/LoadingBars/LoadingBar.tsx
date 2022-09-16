import React from "react"
import styled, { keyframes } from "styled-components"

const loaderAnimation = keyframes`
    0%, 80%, 100% { box-shadow: 0 2.5em 0 -1.3em }
    40% { box-shadow: 0 2.5em 0 0 }
`;

type LoadingBarProps = {
    size?: string
}

const StyledLoadingBar = styled.div<LoadingBarProps>`
    height: ${props => props.size};
    min-height: 10px;
    aspect-ratio: 1/1;
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: ${loaderAnimation} 1.8s infinite ease-in-out;
    color: #8BDEC6;
    font-size: 7px;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;
    :before, :after {
        border-radius: 50%;
        width: 2.5em;
        height: 2.5em;
        animation-fill-mode: both;
        animation: ${loaderAnimation} 1.8s infinite ease-in-out;
        content: '';
        position: absolute;
        top: 0;
    }
    :before {
        left: -3.5em;
        animation-delay: -0.32s;
    }
    :after {
        left: 3.5em;
    }
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