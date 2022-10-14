import React, { useState } from "react"
import styled from "styled-components"
import HeaderColumnLeft from "./HeaderColumnLeft";
import HeaderColumnRight from "./HeaderColumnRight";
import HeaderColumnCenter from "./HeaderColumnCenter";

const StyledHeader = styled.header<any>`

    @media (max-width: ${props => props.minDesktopWidth}px) {
      position: fixed;
      height: 100px;
      align-items: center;
    }

    position: static;
    top: 0;
    left: 0;
    font-family: 'Amatic SC';
    font-size: 24px;
    font-weight: 100;
    line-height: 27px;
    background-color: white;
    color: #585858;
    height: 140px;
    width: calc(100% - 86px);
    padding: 12px 43px;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr auto 1fr;
    box-shadow: -1px 4px 5px -2px rgba(0,0,0,0.25);
    z-index: 1000;

    a {
        color: #585858; 
        text-decoration: none;
    }
`;

const Header = () => {

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);

  return (
    <StyledHeader minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
      <HeaderColumnLeft isMobileMenuOpened={isMobileMenuOpened} setIsMobileMenuOpened={setIsMobileMenuOpened} />
      <HeaderColumnCenter isMobileMenuOpened={isMobileMenuOpened} />
      <HeaderColumnRight />
    </StyledHeader >
  )
}

export default Header
