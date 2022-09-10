import * as React from "react"
import styled from "styled-components";

const StyledInteractiveImage = styled.div`
    img {
        :hover{
            transition: 100ms;
            transform: scale(1.2);
        }
    }
`;

const InteractiveImage = (props: any) => {

    const { children } = props;

    return (
        <StyledInteractiveImage>
            {children}
        </StyledInteractiveImage>
    )
}

export default InteractiveImage;