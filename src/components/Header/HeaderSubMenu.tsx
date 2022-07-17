import { Link } from "gatsby";
import * as React from "react"
import styled from "styled-components"

const StyledHeaderSubMenu = styled.nav`
position: absolute;
display: flex;
flex-direction: column;
width: 300px;
min-height: 50px;
font-weight: normal !important;
background-color: rgba(5,5,5,0.25);
z-index: 1000;
`;

type SubMenuProps = {
    childItems: [
        {
            url: string
            label: string
        }
    ]
}

const HeaderSubMenu = (props: SubMenuProps) => {

    const { childItems } = props;

    return (
        <StyledHeaderSubMenu>
            {
                childItems.map((links: any) => <Link to={links.url}>{links.label}</Link>)
            }
        </StyledHeaderSubMenu>
    )
}

export default HeaderSubMenu;