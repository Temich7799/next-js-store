import React from "react"
import styled from "styled-components";
import HideOnDesktopWrapper from "../../../styles/HideOnDesktopWrapper";
import { HeaderMenuProps } from "../../../types/HeaderMenuPropsType";
import LanguageSelector from "../../LanguageSelector";
import SocialsList from "../../SocialsList";
import HeaderMenuItems from "./HeaderMenuItems";

const StyledHeaderMenu = styled.nav<any>`

    @media (max-width: ${props => props.minDesktopWidth}px) {
      position: absolute;
      top: ${props => props.isMobileMenuOpened ? '124px' : '-500px'};
      left: 0;
      width: 100%;
      height: 375px;
      padding-top: 50px;
      justify-content: space-between;
      flex-direction: column;
      transition: 250ms;
      background-color: #f7dcf4;
      overflow: scroll;
      //::-webkit-scrollbar { display: none }
    }

    display: flex;
    align-items: center;
    z-index: 100;
    text-align: center;
`;

const MobileHeaderMenuFooter = styled.div<any>`

  @media (min-width: ${props => props.minDesktopWidth}px) {
    display: none;
  }

  width: 100%;
  padding: 8% 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 25px;
  background-color: rgb(248, 229, 255);
`;

const HeaderMenu = (props: HeaderMenuProps) => {

  const { isMobileMenuOpened } = props;

  return (
    <StyledHeaderMenu isMobileMenuOpened={isMobileMenuOpened} minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
      <HeaderMenuItems />
      <MobileHeaderMenuFooter minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
        <SocialsList />
        <LanguageSelector />
      </MobileHeaderMenuFooter>
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
