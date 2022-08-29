import * as React from "react";
import Header from "../Header/HeaderMenu/Header";
import Footer from "../Footer/Footer";
require('typeface-amatic-sc');
require('typeface-comfortaa');
require('../../styles/global.css')

type LayoutProps = {
    children: JSX.Element | string
}

const Layout = (props: LayoutProps) => {

    const { children } = props;

    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout


