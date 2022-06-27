import * as React from "react"
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

interface IProps {
    children: JSX.Element;
}

const Layout = (props: IProps) => {
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    )
}

export default Layout
