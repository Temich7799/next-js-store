import * as React from "react";
import Header from "../Header/HeaderMenu/Header";
import Footer from "../Footer/Footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
require('../../styles/global.css');

const client = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache(),
});

type LayoutProps = {
    children: JSX.Element | string
}

const Layout = (props: LayoutProps) => {

    const { children } = props;

    return (
        <ApolloProvider client={client}>
            <Header />
            {children}
            <Footer />
        </ApolloProvider>
    )
}

export default Layout


