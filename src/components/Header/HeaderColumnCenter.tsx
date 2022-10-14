import React from "react";
import HideOnDesktopWrapper from "../../styles/HideOnDesktopWrapper";
import { HeaderMenuProps } from "../../types/HeaderMenuPropsType";
import HeaderLogo from "./HeaderMenu/HeaderLogo";
import HeaderMenu from "./HeaderMenu/HeaderMenu";

const HeaderColumnCenter = (props: HeaderMenuProps) => {

    const { isMobileMenuOpened } = props;
    return (
        <>
            <HideOnDesktopWrapper>
                <HeaderLogo />
            </HideOnDesktopWrapper>
            <HeaderMenu isMobileMenuOpened={isMobileMenuOpened} />
        </>
    )
}

export default HeaderColumnCenter;