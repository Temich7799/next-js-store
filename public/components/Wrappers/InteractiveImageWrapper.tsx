import * as React from "react"
import styled from "styled-components";

const StyledInteractiveImageWrapper = styled.div`
    @media (hover: hover) and (pointer: fine) {
        img {
            :hover{
                transition: 100ms;
                transform: scale(1.2);
            }
        }
    }
`;

const InteractiveImageWrapper = ({ children }) => {

    return (
        <StyledInteractiveImageWrapper>
            {children}
        </StyledInteractiveImageWrapper>
    )
}

export default InteractiveImageWrapper;