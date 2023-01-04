import React from "react";
import styled from "styled-components";
import { MobileMenuButtonProps } from "../../types/MobileMenuButtonPropsType";
import MobileMenuButton from "../Buttons/MobileMenuButton";
import HeaderMenu from "./HeaderMenu/HeaderMenu";
import LogoDesktop from "./HeaderMenu/LogoDesktop";

const StyledHeaderColumnLeft = styled.div`
    margin-left: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2.5%;
`;

const HeaderColumnLeft = (props: MobileMenuButtonProps) => {

    const { isMobileMenuOpened, setIsMobileMenuOpened } = props;

    return (
        <StyledHeaderColumnLeft>
            <MobileMenuButton isMobileMenuOpened={isMobileMenuOpened} setIsMobileMenuOpened={setIsMobileMenuOpened} />
            <LogoDesktop />
            <HeaderMenu isMobileMenuOpened={isMobileMenuOpened} />
        </StyledHeaderColumnLeft>
    )
}

export default HeaderColumnLeft;