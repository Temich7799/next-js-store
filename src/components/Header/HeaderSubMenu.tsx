import { Link } from "gatsby";
import * as React from "react"
import styled from "styled-components"

const StyledHeaderSubMenu = styled.nav`
    font-size: 16px;
    font-weight: normal !important;
    position: absolute;
    width: fit-content;
    min-height: 50px;
    background-color: #fefefe;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    z-index: 1000;
    ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0;
    }
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
            <ul>
                {childItems.map((links: any) => <li><Link to={links.url}>{links.label}</Link></li>)}
            </ul>
        </StyledHeaderSubMenu>
    )
}

export default HeaderSubMenu;