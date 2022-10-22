import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useContext } from "react";
import styled from "styled-components";
import { LangContext } from "../../Layouts/Layout";

const StyledLogoDesktop = styled.div<any>`

  min-width: 85px;

  @media (max-width: ${props => props.minDesktopWidth}px) {
          display: none;
      }
`;

const LogoDesktop = () => {

  const { langPrefix } = useContext(LangContext);

  return (
    <StyledLogoDesktop minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
      <Link to={`/${langPrefix}`}>
        <StaticImage src="../../../images/desktop_logo.svg" alt="Logo" placeholder="blurred" />
      </Link>
    </StyledLogoDesktop>
  )
}

export default LogoDesktop;