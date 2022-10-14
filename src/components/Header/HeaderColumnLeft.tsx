import React from "react";
import HideOnMobileWrapper from "../../styles/HideOnMobileWrapper";
import { MobileMenuButtonProps } from "../../types/MobileMenuButtonPropsType";
import MobileMenuButton from "../Buttons/MobileMenuButton";
import SocialsList from "../SocialsList";

const HeaderColumnLeft = (props: MobileMenuButtonProps) => {

    const { isMobileMenuOpened, setIsMobileMenuOpened } = props;
    return (
        <>
            <MobileMenuButton isMobileMenuOpened={isMobileMenuOpened} setIsMobileMenuOpened={setIsMobileMenuOpened} />
            <HideOnMobileWrapper>
                <SocialsList />
            </HideOnMobileWrapper>
        </>
    )
}

export default HeaderColumnLeft;