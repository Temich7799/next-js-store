import React, { createContext } from "react";
import Header from "../Header/HeaderMenu/Header";
import Footer from "../Footer/Footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BatchHttpLink } from "@apollo/client/link/batch-http";
require('../../styles/global.css');

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
                        allWcProducts: {
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

type LayoutProps = {
    children: JSX.Element | string
    language?: string
}

export const LangContext = createContext('ru');

const Layout = (props: LayoutProps) => {

    const { children, language = 'ru' } = props;

    return (
        <ApolloProvider client={client} >
            <LangContext.Provider value={language}>
                <Header />
                {children}
                <Footer />
            </LangContext.Provider>
        </ApolloProvider>
    )
}

export default Layout


