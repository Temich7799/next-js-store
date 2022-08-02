import * as React from "react"
import SocialsList from "../SocialsList"
import Menu from "./HeaderMenu"
import styled from "styled-components"

const StyledHeader = styled.header`
font-family: 'Amatic SC';
font-size: 24px;
font-weight: 100;
line-height: 27px;
color: #585858;
a {
    color: #585858; 
    text-decoration: none;
}
height: 140px;
width: calc(100% - 86px);
padding: 12px 43px;
display: grid;
justify-items: center;
grid-template-columns: 1fr 4fr 1fr;
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
