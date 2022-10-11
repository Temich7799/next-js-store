import React, { useContext } from "react"
import DesktopHeaderMenu from "./DesktopHeaderMenu/DesktopHeaderMenu"
import MobileHeaderMenu from "./MobileHeaderMenu/MobileHeaderMenu"
import SocialsList from "../../SocialsList";
import { LangContext } from "../../Layouts/Layout";
import { useHeaderMenuItems } from "../../../services/hooks/gatsby/useHeaderMenuItems";
import { MenuItemType } from "../../../types/MenuItemType";

type HeaderMenuProps = {
  isMobile: boolean | undefined
}

const HeaderMenu = (props: HeaderMenuProps) => {

  const { isMobile } = props;

  const { language } = useContext(LangContext);
  const data: [MenuItemType] = useHeaderMenuItems(language);

  return (
    <>
      {
        isMobile
          ? <MobileHeaderMenu data={data} />
          :
          <>
            <SocialsList />
            <DesktopHeaderMenu data={data} />
          </>
      }
    </>
  )
}

export default HeaderMenu
