import * as React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
require('typeface-amatic-sc');
require('typeface-comfortaa');

type LayoutProps = {
    children: JSX.Element
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


