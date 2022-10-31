import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useContext } from "react";
import HideOnDesktopWrapper from "../../../styles/HideOnDesktopWrapper";
import { LangContext } from "../../Layouts/Layout";

const LogoMobile = () => {

  const { langPrefix } = useContext(LangContext);

  return (
    <HideOnDesktopWrapper>
      <Link to={`/${langPrefix}`}>
        <StaticImage src="../../../images/logo/mobile_logo.svg" alt="Logo" placeholder="blurred" />
      </Link>
    </HideOnDesktopWrapper>
  )
}

export default LogoMobile;