import { gql, useLazyQuery } from "@apollo/client";
import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { MenuItemType } from "../../../types/MenuItemType";
import { LangContext } from "../../Layouts/Layout";
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

    const { language } = useContext(LangContext);

    const [data, setData] = useState([]);
    const [getItems] = useLazyQuery(gql` query getAllMultilangHeaderMenuItems { ru: allWpMenuItems(slug: "header", language: ru) { url title slug child_items { url title } } uk: allWpMenuItems(slug: "header", language: uk) { url title slug child_items { url title } } en: allWpMenuItems(slug: "header", language: en) { url title slug child_items { url title } } } `);
    useEffect(() => {
        getItems().then(response => {
            setData(addPathFields(response.data[language]));
        });
    }, []);

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
            <StyledHeaderMenuItems minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
                {
                    data.length && data.map((item: MenuItemType, index: number) => <HeaderMenuItem data={item} key={index} />)
                }
            </StyledHeaderMenuItems>
        </HeaderMenuWrapper>
    )
}

export default HeaderMenuItems;