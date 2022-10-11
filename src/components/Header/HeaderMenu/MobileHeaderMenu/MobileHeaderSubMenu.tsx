import { Link } from "gatsby";
import React, { useContext } from "react"
import styled, { keyframes } from "styled-components"
import { formatCatalogChildItemUrl } from "../../../../services/formatCatalogChildItemUrl";
import { LangContext } from "../../../Layouts/Layout";

const subMenuPopUpAnimation = keyframes`
    from {opacity: 0%}
    to {opacity: 100%}
`;

const MobileHeaderSubMenuLinks = styled.ul`
    max-height: 200px;
    margin: 5px 0;
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
    ::-webkit-scrollbar { display: none }
    overflow-y: scroll;
`;

type MobileHeaderMenuSubLink = {
    path: string
    label: string
}

type MobileHeaderSubMenuProps = {
    data: {
        path: string
        childItems: {
            nodes: [MobileHeaderMenuSubLink]
        }
    }
}

const MobileHeaderSubMenu = (props: MobileHeaderSubMenuProps) => {

    const language = useContext(LangContext);
    const { MOBILE_HEADER_SUBMENU_SEE_ALL } = require(`../../../../languages/${language}/languages`);

    const { data } = props;

    return (
        <MobileHeaderSubMenuLinks>
            <li>
                <Link to={data.path}>{MOBILE_HEADER_SUBMENU_SEE_ALL}</Link>
            </li>
            {
                data.childItems.nodes.length && data.childItems.nodes.map((childItem: MobileHeaderMenuSubLink, index: number) =>
                    <li key={index}>
                        <a href={formatCatalogChildItemUrl(childItem.path)}>
                            {childItem.label}
                        </a>
                    </li>)
            }
        </MobileHeaderSubMenuLinks>
    )
}

export default MobileHeaderSubMenu;