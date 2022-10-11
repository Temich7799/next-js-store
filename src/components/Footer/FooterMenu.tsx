import React, { Fragment, useContext } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { LangContext } from "../Layouts/Layout";
import { useFooterMenuItems } from "../../services/hooks/gatsby/useFooterMenuItems";
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

    const { language, langPrefix } = useContext(LangContext);
    const data: [MenuItemType] = useFooterMenuItems(language);

    return (
        <StyledFooterMenu>
            {
                data.map((item: MenuItemType, index: number) =>
                    index === data.length - 1
                        ?
                        <Link to={`/${langPrefix}${item.slug}`} key={index}>
                            {item.title}
                        </Link>
                        :
                        <Fragment>
                            <Link to={`/${langPrefix}${item.slug}`} key={index}>
                                {item.title}
                            </Link> /
                        </Fragment>
                )
            }
        </StyledFooterMenu >
    )
}

export default FooterMenu;