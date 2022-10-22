import React from "react";
import HideOnDesktopWrapper from "../../styles/HideOnDesktopWrapper";
import HideOnMobileWrapper from "../../styles/HideOnMobileWrapper";
import SocialsList from "../SocialsList";
import LogoMobile from "./HeaderMenu/LogoMobile";
const HeaderColumnCenter = () => {

    return (
        <>
            <LogoMobile />
            <HideOnMobileWrapper>
                <SocialsList />
            </HideOnMobileWrapper>
        </>
    )
}

export default HeaderColumnCenter;