import React from "react"
import styled from "styled-components"
import FooterMenu from "./FooterMenu";

const StyledFooter = styled.footer`
    font-family: 'Amatic SC';
    font-size: 18px;
    line-height: 27px;
    color: black;
    a {
        color: black; 
        text-decoration: none;
    }
    min-height: 165px;
    padding: 20px 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #b5d8d8;
    flex: 0 0 auto;
`;


const Footer = () => {
    return (
        <StyledFooter>
            <FooterMenu />
        </StyledFooter>
    )
}

export default Footer
