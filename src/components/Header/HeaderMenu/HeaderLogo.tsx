import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useContext } from "react";
import styled from "styled-components";
import { LangContext } from "../../Layouts/Layout";

type HeaderLogoProps = {
    hideOnMobile?: boolean
    hideOnDesktop?: boolean
}

const StyledHeaderLogo = styled.div<any>`

  @media (max-width: ${props => props.minDesktopWidth}px) {
    display: ${props => props.hideOnMobile === true ? 'none' : 'block'}
  }
  @media (min-width: ${props => props.minDesktopWidth}px) {
    display: ${props => props.hideOnDesktop === true ? 'none' : 'block'}
  }
`;

const HeaderLogo = (props: HeaderLogoProps) => {

    const { hideOnMobile, hideOnDesktop } = props;

    const { langPrefix } = useContext(LangContext);

    return (
        <StyledHeaderLogo hideOnMobile={hideOnMobile} hideOnDesktop={hideOnDesktop} minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
            <Link to={`/${langPrefix}`}>
                <StaticImage src="../../../../images/logo.png" alt="Logo" placeholder="blurred" layout="fixed" width={100} height={100} />
            </Link>
        </StyledHeaderLogo>
    )
}

export default HeaderLogo;