import * as React from "react"
import SocialsList from "../SocialsList/SocialsList"
import Menu from "./Menu/Menu"
import styled from "styled-components"
require('typeface-comfortaa')
require('typeface-amatic-sc')

const StyledHeader = styled.header`
font-family: 'Amatic SC';
height: 165px;
width: calc(100% - 86px);
padding: 12px 43px;
display: flex;
justify-content: space-between;
align-items: center;
`;

const Header = () => {
    return (
        <StyledHeader>
            <SocialsList/>
            <Menu />
        </StyledHeader >
    )
}

export default Header
