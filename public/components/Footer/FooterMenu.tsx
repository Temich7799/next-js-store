import React, { Fragment, useContext } from "react"
import Link from 'next/link'
import styled from "styled-components"
import { PageContext } from "../Layouts/Layout";
import { MenuItemType } from "../../types/MenuItemType";

const StyledFooterMenu = styled.nav`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    a {
        padding: 0 5px;
    }
`;

const FooterMenu = () => {

    const { menuItems, langPrefix } = useContext(PageContext);
    const items = menuItems.footerMenuItems;

    return (
        <StyledFooterMenu>
            {
                items.map((item: MenuItemType, index: number) =>
                    index === items.length - 1
                        ?
                        <Link href={`/${langPrefix}${item.slug}`} key={index}>
                            {item.title}
                        </Link>
                        :
                        <Fragment key={index}>
                            <Link href={`/${langPrefix}${item.slug}`}>
                                {item.title}
                            </Link>
                            {'/'}
                        </Fragment>
                )
            }
        </StyledFooterMenu >
    )
}

export default FooterMenu;