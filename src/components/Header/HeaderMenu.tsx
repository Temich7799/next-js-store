import * as React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import HeaderSubMenu from "./HeaderSubMenu";

const StyledMenu = styled.nav`
min-width: 700px;
display: flex;
justify-content: flex-start;
align-items: center;
a{
    padding: 3px 15px 1px;
    &:hover {
        font-weight: 700;
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
  console.log(data)

  return (
    <StyledMenu>
      {
        links.map
          (
            (link: any) => (links.indexOf(link) == Math.floor(links.length / 2))
              ?
              (link.parentId === null)
                ? <>
                  <Link to="https://home">
                    <StaticImage src="../../images/logo.png" alt="Logo" placeholder="blurred" layout="fixed" width={100} height={100} />
                  </Link>
                  <Link to={link.url}>{link.label}</Link>
                  {(link.childItems.nodes.length) ? < HeaderSubMenu childItems={link.childItems.nodes} /> : false}
                </>
                : false
              :
              (link.parentId === null) ?
                <>
                  <Link to={link.url}>{link.label}</Link>
                  {(link.childItems.nodes.length) ? < HeaderSubMenu childItems={link.childItems.nodes} /> : false}
                </>
                : false
          )
      }
    </StyledMenu >
  )
}

export default Menu
