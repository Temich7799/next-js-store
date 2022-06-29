import * as React from "react"
import { Link } from "gatsby"
import links from "./links"
import styled from "styled-components"

const StyledMenu = styled.nav`
min-width: 700px;
display: flex;
justify-content: flex-start;
align-items: center;
a{
    padding: 3px 15px 1px;
    &:hover {
        font-weight: 700;
    }
}
`;

const Menu = () => {
    return (
        <StyledMenu>
            {links.map((link) => <Link to={link.url}>{link.name}</Link>)}
        </StyledMenu>
    )
}

export default Menu
