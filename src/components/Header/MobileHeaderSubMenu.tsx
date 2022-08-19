import { Link } from "gatsby";
import React from "react"
import styled, { keyframes } from "styled-components"

const subMenuPopUpAnimation = keyframes`
    from {opacity: 0%}
    to {opacity: 100%}
`;

const MobileHeaderSubMenuLinks = styled.ul`
    margin: 30px 0;
    font-family: "Comfortaa";
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    font-size: 16px;
    list-style: none;
    animation: ${subMenuPopUpAnimation} 750ms;
`;

type MobileHeaderMenuSubLink = {
    url: string
    label: string
}

type MobileHeaderSubMenuProps = {
    data: {
        url: string
        childItems: {
            nodes: [MobileHeaderMenuSubLink]
        }
    }
}

const MobileHeaderSubMenu = (props: MobileHeaderSubMenuProps) => {

    const { data } = props;

    return (
        <MobileHeaderSubMenuLinks>
            <li><Link to={data.url}>See All</Link></li>
            {
                data.childItems.nodes.length && data.childItems.nodes.map((childItem: MobileHeaderMenuSubLink) =>
                    <li><Link to={childItem.url}>{childItem.label}</Link></li>)
            }
        </MobileHeaderSubMenuLinks>
    )
}

export default MobileHeaderSubMenu;