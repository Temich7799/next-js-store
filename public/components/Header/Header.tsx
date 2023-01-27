import React, { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import HeaderColumnLeft from "./HeaderColumnLeft";
import HeaderColumnRight from "./HeaderColumnRight";
import HeaderColumnCenter from "./HeaderColumnCenter";
import useMobile from "../../services/hooks/useMobile";

const StyledHeader = styled.header<any>`

    @media (max-width: ${props => props.minDesktopWidth}px) {
      position: fixed;
      align-items: center;
      grid-template-columns: 1fr 1fr 1fr;
    }

    position: static;
    top: ${props => props.isScrollingDown ? '-200px' : '0'};
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
    transition: 200ms;
    z-index: 1000;

    a {
        color: #585858; 
        text-decoration: none;
    }
`;

const Header = () => {

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState<boolean>(false);
  const [isScrollingDown, setIsScrollingDown] = useState<boolean>(false);
  /*
   const isMobile = useMobile();
  
     useEffect(() => {
       if (isMobile === true) {
         window.scrolled = window.scrollY;
         window.addEventListener('scroll', onScrollHandler);
         return () => window.removeEventListener('scroll', onScrollHandler);
       }
     }, []);
   
     function onScrollHandler() {
       if (window.scrollY - window.scrolled > 75) {
         setIsScrollingDown(true);
         window.scrolled = window.scrollY;
       }
       if (window.scrolled > window.scrollY) {
         setIsScrollingDown(false);
         window.scrolled = window.scrollY;
       }
     }
   */
  return (
    <StyledHeader minDesktopWidth={process.env.NEXT_PUBLIC_MIN_DESKTOP_WIDTH} isScrollingDown={isScrollingDown}>
      <HeaderColumnLeft isMobileMenuOpened={isMobileMenuOpened} setIsMobileMenuOpened={setIsMobileMenuOpened} />
      <HeaderColumnCenter />
      <HeaderColumnRight />
    </StyledHeader >
  )
}

export default Header
