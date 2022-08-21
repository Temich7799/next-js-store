import React from "react"
import styled from "styled-components"
import toogle from "../services/toogle";
import Button from "./Button";
import ImageSVG from "./ImageSVG";

const StyledPopUp = styled.div<any>`
    position:fixed;
    display: ${props => props.display == true ? "block" : "none"};
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    z-index: 100;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
`;

const CloseButton = styled(Button)`      
    position: absolute;
    right: 5px;
    top: 10px;
`;

type PopUpProps = {
    children: JSX.Element
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const PopUp = (props: PopUpProps) => {

    const { children, visible, setVisible } = props;

    function buttonOnClickHandler(): void {
        setVisible(toogle(visible));
    }

    return (
        <StyledPopUp display={visible}>
            <CloseButton buttonStyle="transparent" buttonSize="shrink" onClick={buttonOnClickHandler}>
                <ImageSVG path="/svg/close.svg" height="15px" width="15px" />
            </CloseButton>
            {children}
        </StyledPopUp>
    )
}

export default PopUp;
