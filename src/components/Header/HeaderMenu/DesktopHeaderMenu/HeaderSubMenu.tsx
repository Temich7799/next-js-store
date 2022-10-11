import React from "react"
import styled from "styled-components"
import { formatCatalogChildItemUrl } from "../../../../services/formatCatalogChildItemUrl";
import { MenuItemType } from "../../../../types/MenuItemType";

const StyledHeaderSubMenu = styled.div`
    font-size: 16px;
    font-weight: normal !important;
    position: absolute;
    top: 100px;
    width: fit-content;
    min-height: 50px;
    background-color: #fefefe;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    z-index: 1000;
`;

const SubMenuItems = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
`;

const SubMenuItem = styled.li`
    text-shadow: none;
    :hover {
        text-shadow: 0.25px 0 0 currentColor;
    }
`;

type SubMenuProps = {
    data: [MenuItemType]
}

const HeaderSubMenu = (props: SubMenuProps) => {

    const { data } = props;

    return (
        <StyledHeaderSubMenu>
            <SubMenuItems>
                {
                    data.map((item: MenuItemType, index: number) =>
                        <SubMenuItem key={index}>
                            <a href={formatCatalogChildItemUrl(item.slug != '/home/' ? `/${item.slug}` : '/')}>
                                {item.title}
                            </a>
                        </SubMenuItem>)
                }
            </SubMenuItems>
        </StyledHeaderSubMenu >
    )
}

export default HeaderSubMenu;