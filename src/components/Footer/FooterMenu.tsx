import * as React from "react"
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
    query FooterMenu {
        wpMenu(id: {eq: "dGVybTo0NA=="}) {
            menuItems {
                nodes {
                  label
                  url
                }
              }
            }
          } 
    `);

    const links = data.wpMenu.menuItems.nodes;

    return (
        <StyledFooterMenu>
            {links.map((link: any) => (links.indexOf(link) == links.length - 1)
                ? < Link to={link.url} > {link.label}</Link>
                : <> < Link to={link.url} > {link.label}</Link> / </>
            )
            }
        </StyledFooterMenu >
    )
}

export default FooterMenu;