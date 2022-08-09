import React from "react"
import styled from "styled-components"

const StyledPopUp = styled.div<any>`
    position:fixed;
    display: ${props => props.display == true ? "block" : "none"};
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 100;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
`;

type PopUpProps = {
    children: JSX.Element
    visible: boolean
}

const PopUp = (props: PopUpProps) => {

    const { children, visible } = props;

    return (
        <StyledPopUp display={visible}>
            {children}
        </StyledPopUp>
    )
}

export default PopUp;
