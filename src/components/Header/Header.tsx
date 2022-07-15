import * as React from "react"
import SocialsList from "../SocialsList/SocialsList"
import Menu from "./HeaderMenu"
import styled from "styled-components"

const StyledHeader = styled.header`
font-family: 'Amatic SC';
font-size: 24px;
line-height: 27px;
color: #4b4b4b;
a {
    color: #4b4b4b; 
    text-decoration: none;
}
height: 140px;
width: calc(100% - 86px);
padding: 12px 43px;
display: flex;
justify-content: space-between;
align-items: center;
box-shadow: -1px 4px 5px -2px rgba(0,0,0,0.25);
`;

const Header = () => {
    return (
        <StyledHeader>
            <SocialsList />
            <Menu />
        </StyledHeader >
    )
}

export default Header
