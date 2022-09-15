import * as React from "react";
import Header from "../Header/HeaderMenu/Header";
import Footer from "../Footer/Footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BatchHttpLink } from "@apollo/client/link/batch-http";
require('../../styles/global.css');

const batchLink = new BatchHttpLink({
    uri: "http://localhost:3000/graphql",
    batchMax: 5,
    batchInterval: 100
});

const client = new ApolloClient({
    uri: "http://localhost:3000/graphql",
    cache: new InMemoryCache(
        {
            typePolicies: {
                Query: {
                    fields: {
                        allWpWcProducts: {
                            keyArgs: false,
                            merge(existing = [], incoming) {
                                console.log(incoming)
                                return [...existing, ...incoming]
                            }
                        },
                    },
                },
            },
        }
    ),
});

type LayoutProps = {
    children: JSX.Element | string
}

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


