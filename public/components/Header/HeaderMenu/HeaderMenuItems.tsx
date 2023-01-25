import React, { useContext } from "react"
import styled from "styled-components"
import { MenuItemType } from "../../../types/MenuItemType";
import { PageContext } from "../../../templates/BaseTemplate";
import HeaderMenuItem from "./HeaderMenuItem";

const StyledHeaderMenuItems = styled.ul<any>`

  @media (max-width: ${props => props.minDesktopWidth}px) {
    width: 100%;
    height: 200px;
    padding: 0;
    margin: 0;
    justify-content: flex-start;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;
    gap: 25px;
    list-style: none;
  }

    display: flex;
    flex-wrap: wrap;
    justify-self: center;
    align-items: center;
    list-style: none;
    width: fit-content;
    padding: 0;
`;

const HeaderMenuWrapper = styled.div`
    max-height: 100%;
    width: 100%;
    overflow: scroll;
    scrollbar-width: none;
    //::-webkit-scrollbar { display: none }
`;

const HeaderMenuItems = () => {

    const { menuItems } = useContext(PageContext);

    const items = addPathFields(menuItems.headerMenuItems);

    function addPathFields(items: [MenuItemType]): any {
        return items.map((item: MenuItemType): MenuItemType => {
            return {
                ...item,
                path: item.url.split('.com')[1].replace(/\/+$/, '').replace('home', ''),
                child_items: item.child_items ? item.child_items : item.child_items !== null ? addPathFields(item.child_items) : null,
            }
        });
    }

    return (
        <HeaderMenuWrapper>
            <StyledHeaderMenuItems minDesktopWidth={process.env.NEXT_PUBLIC_MIN_DESKTOP_WIDTH}>
                {
                    items.map((item: MenuItemType, index: number) => <HeaderMenuItem data={item} key={index} />)
                }
            </StyledHeaderMenuItems>
        </HeaderMenuWrapper>
    )
}

export default HeaderMenuItems;