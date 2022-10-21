import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useContext } from "react";
import { LangContext } from "../../Layouts/Layout";

const HeaderLogo = () => {

  const { langPrefix } = useContext(LangContext);

  return (
    <Link to={`/${langPrefix}`}>
      <StaticImage src="../../../images/mobile_logo.svg" alt="Logo" placeholder="blurred" />
    </Link>
  )
}

export default HeaderLogo;