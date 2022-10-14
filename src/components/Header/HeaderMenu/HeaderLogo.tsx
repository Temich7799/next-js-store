import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useContext } from "react";
import { LangContext } from "../../Layouts/Layout";

const HeaderLogo = () => {

  const { langPrefix } = useContext(LangContext);

  return (
    <Link to={`/${langPrefix}`}>
      <StaticImage src="../../../images/logo.png" alt="Logo" placeholder="blurred" layout="fixed" width={100} height={100} />
    </Link>
  )
}

export default HeaderLogo;