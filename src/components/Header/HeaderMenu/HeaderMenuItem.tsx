import React, { useContext } from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import { MenuItemType } from "../../../types/MenuItemType";
import { LangContext } from "../../Layouts/Layout";
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

    const { langPrefix } = useContext(LangContext);

    const { data } = props;

    return (
        <StyledHeaderMenuItem>
            {
                data.child_items !== null
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