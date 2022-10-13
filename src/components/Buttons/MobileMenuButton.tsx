import React from "react";
import { useIsMenuOpenedVar } from "../../services/hooks/apollo/useIsMenuOpenedVar";
import toogle from "../../services/toogle";
import HideOnDesktopWrapper from "../../styles/HideOnDesktopWrapper";
import ImageSVG from "../ImageSVG";
import Button from "./Button";

type MobileMenuButtonProps = {
    setIsMobileMenuOpened: React.Dispatch<React.SetStateAction<boolean>>
    isMobileMenuOpened: boolean
}

const MobileMenuButton = (props: MobileMenuButtonProps) => {

    const { setIsMobileMenuOpened, isMobileMenuOpened } = props;

    const { setIsMenuOpenedVar } = useIsMenuOpenedVar();

    function buttonOnClickHandler(): void {
        setIsMobileMenuOpened(toogle(isMobileMenuOpened));
        setIsMenuOpenedVar(toogle(isMobileMenuOpened));
    }

    return (
        <HideOnDesktopWrapper>
            <Button buttonStyle="transparent" buttonSize="shrink" onClick={buttonOnClickHandler}>
                <ImageSVG path={isMobileMenuOpened ? "/svg/close.svg" : "/svg/open_mobile_menu.svg"} height="30px" width="30px" />
            </Button>
        </HideOnDesktopWrapper>
    )
}

export default MobileMenuButton;