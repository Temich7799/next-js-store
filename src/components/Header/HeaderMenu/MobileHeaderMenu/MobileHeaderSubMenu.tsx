import { Link } from "gatsby";
import React, { useContext } from "react"
import styled, { keyframes } from "styled-components"
import { formatCatalogChildItemUrl } from "../../../../services/formatCatalogChildItemUrl";
import { LangContext } from "../../../Layouts/Layout";
import { MenuItemType } from "../../../../types/MenuItemType";

type MobileHeaderSubMenuProps = {
    data: [MenuItemType]
    parentSlug: string | null
}

const subMenuPopUpAnimation = keyframes`
    from {opacity: 0%}
    to {opacity: 100%}
`;

const MobileHeaderSubMenuItems = styled.ul`
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

const MobileHeaderSubMenu = (props: MobileHeaderSubMenuProps) => {

    const language = useContext(LangContext);
    const { MOBILE_HEADER_SUBMENU_SEE_ALL } = require(`../../../../languages/${language}/languages`);

    const { data, parentSlug } = props;

    return (
        <MobileHeaderSubMenuItems>
            <li>
                <Link to={`/${parentSlug}`}>{MOBILE_HEADER_SUBMENU_SEE_ALL}</Link>
            </li>
            {
                data.map((item: MenuItemType, index: number) =>
                    <li key={index}>
                        <a href={formatCatalogChildItemUrl(`/${item.slug}`)}>
                            {item.title}
                        </a>
                    </li>)
            }
        </MobileHeaderSubMenuItems>
    )
}

export default MobileHeaderSubMenu;