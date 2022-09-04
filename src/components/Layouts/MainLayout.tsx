import * as React from "react";
import Header from "../Header/HeaderMenu/Header";
import Footer from "../Footer/Footer";
import { Provider } from 'react-redux'
import store from "../../store/store";
require('../../styles/global.css');

type LayoutProps = {
    children: JSX.Element | string
}

const Layout = (props: LayoutProps) => {

    const { children } = props;

    return (
        <Provider store={store}>
            <Header />
            {children}
            <Footer />
        </Provider>
    )
}

export default Layout


