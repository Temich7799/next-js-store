import React from "react"
import { graphql, useStaticQuery } from "gatsby";
import DesktopHeaderMenu from "./DesktopHeaderMenu/DesktopHeaderMenu"
import MobileHeaderMenu from "./MobileHeaderMenu/MobileHeaderMenu"
import SocialsList from "../../SocialsList";

type HeaderMenuProps = {
  isMobile: boolean | undefined
}

const HeaderMenu = (props: HeaderMenuProps) => {

  const { isMobile } = props;

  const data = useStaticQuery(graphql`
    query HeaderMenuItems {
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

  return (
    <>
      {
        isMobile
          ? <MobileHeaderMenu data={data.wpMenu.menuItems.nodes} />
          :
          <>
            <SocialsList />
            <DesktopHeaderMenu data={data.wpMenu.menuItems.nodes} />
          </>
      }
    </>
  )
}

export default HeaderMenu
