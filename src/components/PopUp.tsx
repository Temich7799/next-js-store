import React from "react"
import styled, { keyframes } from "styled-components"
import toogle from "../services/toogle";
import Button from "./Buttons/Button";
import ImageSVG from "./ImageSVG";

type PopUpProps = {
    children: JSX.Element
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const slideFromTopAnimation = keyframes`
    from {top: -322px}
    to {top: 50%}
`;

const StyledPopUp = styled.div<any>`
    position:fixed;
    display: ${props => props.isVisible == true ? "block" : "none"};
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 100;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    animation: ${slideFromTopAnimation} 500ms;
`;

const CloseButton = styled(Button)`
    position: absolute;
    right: 5px;
    top: 10px;
`;

const PopUp = (props: PopUpProps) => {

    const { children, visible, setVisible } = props;

    function buttonOnClickHandler(): void {
        setVisible(toogle(visible));
    }

    return (
        <StyledPopUp isVisible={visible} >
            <CloseButton buttonStyle="transparent" buttonSize="shrink" onClick={buttonOnClickHandler}>
                <ImageSVG path="/svg/close.svg" height="15px" width="15px" />
            </CloseButton >
            {children}
        </StyledPopUp >
    )
}

export default PopUp;
