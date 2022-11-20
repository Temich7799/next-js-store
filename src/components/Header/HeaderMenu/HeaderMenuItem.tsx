import React from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import { MenuItemType } from "../../../types/MenuItemType";
import HeaderSubMenu from "./HeaderSubMenu";

type HeaderMenuItemProps = {
    data: MenuItemType
}

const StyledHeaderMenuItem = styled.li`
    width: fit-content;
    min-width: 40px;
    padding: 3px 15px 1px;
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            text-shadow: 0.25px 0 0 currentColor;
        }
    }
`;

const HeaderMenuItem = (props: HeaderMenuItemProps) => {

    const { data } = props;

    return (
        <StyledHeaderMenuItem>
            {
                data.child_items !== null || data.slug === 'catalog'
                    ? <HeaderSubMenu data={data} />
                    :
                    <Link to={data.path}>
                        {data.title}
                    </Link>
            }
        </StyledHeaderMenuItem>
    )
}

export default HeaderMenuItem;