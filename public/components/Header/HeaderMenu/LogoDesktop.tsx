import Link from 'next/link';
import Image from 'next/image';
import React, { useContext } from "react";
import styled from "styled-components";
import { PageContext } from "../../../templates/BaseTemplate";

const StyledLogoDesktop = styled.div<any>`

  min-width: 85px;

  @media (max-width: ${props => props.minDesktopWidth}px) {
          display: none;
      }
`;

const LogoDesktop = () => {

  const { langPrefix } = useContext(PageContext);

  return (
    <StyledLogoDesktop minDesktopWidth={process.env.NEXT_PUBLIC_MIN_DESKTOP_WIDTH}>
      <Link href={`/${langPrefix}`}>
        <Image src="/images/logo/desktop_logo.svg" alt="Logo" width={200} height={59.4} />
      </Link>
    </StyledLogoDesktop>
  )
}

export default LogoDesktop;