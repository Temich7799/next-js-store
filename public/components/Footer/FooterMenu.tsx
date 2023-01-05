import React, { Fragment, useContext, useEffect, useState } from "react"
import Link from 'next/link'
import styled from "styled-components"
import { LangContext } from "../Layouts/Layout";
import { MenuItemType } from "../../types/MenuItemType";
import { gql, useLazyQuery } from "@apollo/client";

const StyledFooterMenu = styled.nav`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    a {
        padding: 0 5px;
    }
`;

const FooterMenu = () => {

    const { language, langPrefix } = useContext(LangContext);

    const [data, setData] = useState([]);
    const [getItems] = useLazyQuery(gql` query getAllMultilangFooterMenuItems { ru: allWpMenuItems(slug: "footer", language: ru) { slug title child_items { slug title } } uk: allWpMenuItems(slug: "footer", language: uk) { slug title child_items { slug title } } en: allWpMenuItems(slug: "footer", language: en) { slug title child_items { slug title } } } `);
    useEffect(() => {
        getItems().then(response => {
            setData(response.data[language]);
        });
    }, []);

    return (
        <StyledFooterMenu>
            {
                data.length && data.map((item: MenuItemType, index: number) =>
                    index === data.length - 1
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