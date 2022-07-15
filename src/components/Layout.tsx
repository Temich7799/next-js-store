import * as React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
require('typeface-amatic-sc')

const Layout = ({ children }: any) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout


