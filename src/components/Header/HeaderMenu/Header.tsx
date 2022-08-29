import React from "react"
import HeaderMenu from "./HeaderMenu"
import styled from "styled-components"
import HeaderShoppingCart from "../HeaderShoppingCart";
import useMobile from "../../../services/hooks/useMobile";

const StyledHeader = styled.header<any>`
    position: ${props => props.isMobile ? "fixed" : "static"};
    top: 0;
    left: 0;
    font-family: 'Amatic SC';
    font-size: 24px;
    font-weight: 100;
    line-height: 27px;
    background-color: white;
    color: #585858;
    a {
        color: #585858; 
        text-decoration: none;
    }
    height: ${props => props.isMobile ? "100px" : "140px"};
    width: calc(100% - 86px);
    padding: 12px 43px;
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: 1fr 4fr 1fr;
    box-shadow: -1px 4px 5px -2px rgba(0,0,0,0.25);
    z-index: 1000;
`;

const Header = () => {

  const isMobile = useMobile();

  return (
    <StyledHeader isMobile={isMobile}>
      <HeaderMenu isMobile={isMobile} />
      <HeaderShoppingCart />
    </StyledHeader >
  )
}

export default Header
