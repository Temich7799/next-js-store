import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import HeaderSubMenu from "./HeaderSubMenu";

const StyledMenu = styled.nav`
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    justify-self: center;
    align-items: center;
    list-style: none;
    width: fit-content;
    padding: 0;
    li{
      padding: 3px 15px 1px;
      &:hover {
          font-weight: 700;
      }
  }
  }
`;

const Menu = () => {

  const data = useStaticQuery(graphql`
    query HeaderMenu {
      wpMenu(id: {eq: "dGVybTozMQ=="}) {
        menuItems {
          nodes {
            label
            url
            parentId
            childItems {
              nodes {
                url
                label
              }
            }
          }
        }
      }
    }
  `);

  const links = data.wpMenu.menuItems.nodes;

  return (
    <StyledMenu>
      <ul>
        {
          links.map
            (
              (link: any) => (links.indexOf(link) == Math.floor(links.length / 2))
                ?
                <>
                  <Link to="/">
                    <StaticImage src="../../images/logo.png" alt="Logo" placeholder="blurred" layout="fixed" width={100} height={100} />
                  </Link>
                  {
                    (link.parentId === null)
                      ?
                      <li>
                        <Link to={link.url}>
                          {link.label}
                          {(link.childItems.nodes.length) ? < HeaderSubMenu childItems={link.childItems.nodes} /> : false}
                        </Link>
                      </li>
                      : false
                  }
                </>
                :
                (link.parentId === null) ?
                  <li>
                    <Link to={link.url}>
                      {link.label}
                      {(link.childItems.nodes.length) ? < HeaderSubMenu childItems={link.childItems.nodes} /> : false}
                    </Link>
                  </li>
                  : false
            )
        }
      </ul>
    </StyledMenu >
  )
}

export default Menu
