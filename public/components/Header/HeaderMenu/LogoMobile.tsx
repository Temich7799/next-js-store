import Link from 'next/link';
import Image from 'next/image';
import React, { useContext } from "react";
import HideOnDesktopWrapper from "../../Wrappers/HideOnDesktopWrapper";
import { LangContext } from "../../Layouts/Layout";

const LogoMobile = () => {

  const { langPrefix } = useContext(LangContext);

  return (
    <HideOnDesktopWrapper>
      <Link href={`/${langPrefix}`}>
        <Image src="../../../images/logo/mobile_logo.svg" alt="Logo" />
      </Link>
    </HideOnDesktopWrapper>
  )
}

export default LogoMobile;