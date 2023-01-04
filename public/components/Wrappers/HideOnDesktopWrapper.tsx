import React from "react";
import styled from "styled-components";

const StyledHideOnDesktopWrapper = styled.div<any>`
    @media (min-width: ${props => props.minDesktopWidth}px) {
        display: none;
    }
`;

const HideOnDesktopWrapper = ({ children }: any) => {

    return (
        <StyledHideOnDesktopWrapper minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
            {children}
        </StyledHideOnDesktopWrapper>
    )
}

export default HideOnDesktopWrapper;