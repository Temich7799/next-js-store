import React from "react";
import styled from "styled-components";

const StyledHideOnMobileWrapper = styled.div<any>`
    @media (max-width: ${props => props.minDesktopWidth}px) {
        display: none;
    }
`;

const HideOnMobileWrapper = ({ children }: any) => {

    return (
        <StyledHideOnMobileWrapper minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
            {children}
        </StyledHideOnMobileWrapper>
    )
}

export default HideOnMobileWrapper;