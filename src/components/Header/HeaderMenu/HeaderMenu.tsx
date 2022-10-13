import React from "react"
import styled from "styled-components";
import SocialsList from "../../SocialsList";
import HeaderMenuItems from "./HeaderMenuItems";

type HeaderMenuProps = {
  isMobileMenuOpened?: boolean
}

const StyledHeaderMenu = styled.nav<any>`

    @media (max-width: ${props => props.minDesktopWidth}px) {
      position: absolute;
      top: ${props => props.isMobileMenuOpened ? '124px' : '-500px'};
      left: 0;
      width: 100%;
      height: 425px;
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

const HeaderMenu = (props: HeaderMenuProps) => {

  const { isMobileMenuOpened } = props;

  return (
    <StyledHeaderMenu isMobileMenuOpened={isMobileMenuOpened} minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
      <HeaderMenuItems />
      <SocialsList hideOnDesktop={true} />
    </StyledHeaderMenu>
  )
}

export default HeaderMenu
