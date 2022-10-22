import React from "react"
import styled from "styled-components"
import SocialsList from "../SocialsList";
import FooterMenu from "./FooterMenu";

const StyledFooter = styled.footer`
    font-family: 'Noto Serif';
    font-size: 12px;
    color: black;
    a {
        color: black; 
        text-decoration: none;
    }
    padding: 50px 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 25px;
    align-items: center;
    background-color: #9ed6e4;
    flex: 0 0 auto;
`;


const Footer = () => {
    return (
        <StyledFooter>
            <FooterMenu />
            <SocialsList />
        </StyledFooter>
    )
}

export default Footer
