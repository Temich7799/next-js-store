import Link from 'next/link';
import Image from 'next/image';
import React, { useContext } from "react";
import HideOnDesktopWrapper from "../../Wrappers/HideOnDesktopWrapper";
import { PageContext } from "../../../templates/BaseTemplate";

const LogoMobile = () => {

  const { langPrefix } = useContext(PageContext);

  return (
    <HideOnDesktopWrapper>
      <Link href={`/${langPrefix}`}>
        <Image src="/images/logo/mobile_logo.svg" alt="Logo" width={70} height={45.55} />
      </Link>
    </HideOnDesktopWrapper>
  )
}

export default LogoMobile;