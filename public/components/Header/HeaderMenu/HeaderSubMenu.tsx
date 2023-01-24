import Link from 'next/link';
import React, { useContext, useRef, useState } from "react";
import styled from "styled-components";
import useMobile from "../../../services/hooks/useMobile";
import toogle from "../../../services/toogle";
import { MenuItemType } from "../../../types/MenuItemType";
import { PageContext } from "../../Layouts/Layout";
import CatalogSubMenuItems from "./CatalogSubMenuItems";
import SubMenuIcon from "./SubMenuIcon";
import { SubMenuItem } from "./SubMenuItem";

type HeaderSubMenuProps = {
    data: MenuItemType | any
}

const SubMenuTitle = styled.div<any>`
    height: 25px;
    display: flex;
    align-items: center;
    gap: 2.5px;

    @media (max-width: ${props => props.minDesktopWidth}px) {
        position: relative;
        left: 5px;
        width: fit-content;
        margin: 0 auto;
    }
`;

const SubMenuItems = styled.ul<any>`

    font-family: "Didact Gothic";
    display: ${props => props.isSubMenuOpened ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    list-style: none;

    @media (min-width: ${props => props.minDesktopWidth}px) {
        position: absolute;
        top: 55px;
        width: fit-content;
        align-items: flex-start;
        min-height: 50px;
        padding: 1%;
        font-size: 16px;
        font-weight: normal !important;
        background-color: #fefefe;
        box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
        z-index: 1000;
    }

    @media (max-width: ${props => props.minDesktopWidth}px) {
        /*max-height: 200px;*/
        margin: 5px 0;
        padding: 0;
        padding-top: 20px;
        justify-content: center;
        gap: 15px;
        font-size: 16px;
        ::-webkit-scrollbar { display: none }
        overflow-y: scroll;
    }
`;

const HeaderSubMenu = (props: HeaderSubMenuProps) => {

    const { language } = useContext(PageContext);
    const { MOBILE_HEADER_SUBMENU_SEE_ALL } = require(`../../../languages/${language}/languages`);

    const { data } = props;

    const [isSubMenuOpened, setIsSubMenuOpened] = useState<boolean>(false);

    const isMobile = useMobile();

    const ref = useRef<any>();

    function onMouseOverHandler(): void {
        setIsSubMenuOpened(true);
    }

    function onMouseLeaveHandler(mouseLeaveEvent: any): void {
        mouseLeaveEvent.relatedTarget !== ref.current && setIsSubMenuOpened(false)
    }

    function onClickHandler(): void {
        setIsSubMenuOpened(toogle(isSubMenuOpened));
    }

    return (
        <>
            {
                isMobile
                    ?
                    <SubMenuTitle minDesktopWidth={process.env.NEXT_PUBLIC_MIN_DESKTOP_WIDTH} onClick={() => onClickHandler()} >
                        {data.title}
                        <SubMenuIcon isOpened={isSubMenuOpened} />
                    </SubMenuTitle>
                    :
                    <Link href={data.path}>
                        <SubMenuTitle onMouseOver={() => onMouseOverHandler()} onMouseLeave={(e: any) => onMouseLeaveHandler(e)}>
                            {data.title}
                            <SubMenuIcon isOpened={isSubMenuOpened} />
                        </SubMenuTitle>
                    </Link>

            }
            {
                <SubMenuItems ref={ref} isSubMenuOpened={isSubMenuOpened} minDesktopWidth={process.env.NEXT_PUBLIC_MIN_DESKTOP_WIDTH} onMouseLeave={(e: any) => onMouseLeaveHandler(e)}>
                    {
                        isMobile &&
                        <SubMenuItem>
                            <Link href={data.path}>{MOBILE_HEADER_SUBMENU_SEE_ALL}</Link>
                        </SubMenuItem>
                    }
                    {
                        data.slug === 'catalog'
                            ? <CatalogSubMenuItems />
                            : data.child_items.map((item: MenuItemType, index: number) => {
                                <SubMenuItem key={index}>
                                    <Link href={item.path}>
                                        {item.title}
                                    </Link>
                                </SubMenuItem>
                            })
                    }
                </SubMenuItems>
            }
        </>

    )
}

export default HeaderSubMenu;