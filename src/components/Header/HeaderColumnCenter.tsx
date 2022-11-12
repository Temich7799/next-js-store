import React from "react";
import HideOnMobileWrapper from "../Wrappers/HideOnMobileWrapper";
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