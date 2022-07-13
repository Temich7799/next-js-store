import { Link } from "gatsby";
import * as React from "react"
import styled from "styled-components"

const StyledHeaderSubMenu = styled.nav`
width: 300px;
min-height: 50px;
background-color: blue;
z-index: 1000;
`;

const HeaderSubMenu = ({ childItems }: any) => {
    return (
        <StyledHeaderSubMenu>
            {
                childItems.map((links: any) => <Link to={links.url}>{links.label}</Link>)
            }
        </StyledHeaderSubMenu>
    )
}

export default HeaderSubMenu;