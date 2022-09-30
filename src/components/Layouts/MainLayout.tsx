import * as React from "react";
import Header from "../Header/HeaderMenu/Header";
import Footer from "../Footer/Footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BatchHttpLink } from "@apollo/client/link/batch-http";
require('../../styles/global.css');

type LayoutProps = {
    children: JSX.Element | string
}

const client = new ApolloClient({
    link: new BatchHttpLink({
        uri: process.env.GATSBY_APOLLO_SERVER_URL,
        batchMax: 5,
        batchInterval: 100
    }),
    cache: new InMemoryCache(
        {
            typePolicies: {
                Query: {
                    fields: {
                        allWpWcProducts: {
                            keyArgs: false,
                            merge(existing = [], incoming) {
                                return [...existing, ...incoming]
                            }
                        },
                    },
                },
            },
        }
    ),
});

const Layout = (props: LayoutProps) => {

    const { children } = props;

    return (
        <ApolloProvider client={client} >
            <Header />
            {children}
            <Footer />
        </ApolloProvider>
    )
}

export default Layout

