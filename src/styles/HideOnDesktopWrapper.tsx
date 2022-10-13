import React from "react";
import styled from "styled-components";

type HideOnDesktopWrapperProps = {
    children: JSX.Element
}

const StyledHideOnDesktopWrapper = styled.div<any>`
    @media (min-width: ${props => props.minDesktopWidth}px) {
        display: none;
    }
`;

const HideOnDesktopWrapper = (props: HideOnDesktopWrapperProps) => {

    const { children } = props;

    return (
        <StyledHideOnDesktopWrapper minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
            {children}
        </StyledHideOnDesktopWrapper>
    )
}

export default HideOnDesktopWrapper;