import React, { Fragment } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const StyledFooterMenu = styled.nav`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    a {
        padding: 0 5px;
    }
`;

const FooterMenu = () => {

    const data = useStaticQuery(graphql`
        query getAllFooterMenuItems {
            wpMenu(id: {eq: "dGVybTo2Ng=="}) {
                menuItems {
                    nodes {
                    label
                    path
                    }
                }
            }
        } 
    `);

    const links = data.wpMenu.menuItems.nodes;

    return (
        <StyledFooterMenu>
            {links.map((link: any, index: number) => index == links.length - 1
                ? <Link to={link.path} key={index}> {link.label}</Link>
                : <Fragment key={index}> <Link to={link.path} > {link.label}</Link> / </Fragment>
            )
            }
        </StyledFooterMenu >
    )
}

export default FooterMenu;