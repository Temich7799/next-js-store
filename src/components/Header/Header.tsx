import React, { useState } from "react"
import styled from "styled-components"
import HeaderColumnLeft from "./HeaderColumnLeft";
import HeaderColumnRight from "./HeaderColumnRight";
import HeaderColumnCenter from "./HeaderColumnCenter";

const StyledHeader = styled.header<any>`

    @media (max-width: ${props => props.minDesktopWidth}px) {
      position: fixed;
      align-items: center;
      grid-template-columns: 1fr 1fr 1fr;
    }

    position: static;
    top: 0;
    left: 0;
    font-family: 'Noto Serif';
    font-size: 16px;
    background-color: white;
    color: #585858;
    height: 60px;
    width: calc(100% - 86px);
    padding: 12px 43px;
    display: grid;
    justify-items: center;
    align-content: center;
    align-items: center;
    grid-template-columns: 4fr 1fr 1fr;
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
      <HeaderColumnCenter />
      <HeaderColumnRight />
    </StyledHeader >
  )
}

export default Header
