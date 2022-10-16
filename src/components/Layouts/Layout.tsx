import React, { createContext } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import styled from "styled-components";
require('../../styles/global.css');

type LayoutProps = {
    children: JSX.Element | string
    language?: string
}

const Main = styled.main<any>`

    @media (max-width: ${props => props.minDesktopWidth}px) {
        margin-top: 125px;
    }

    margin-top: 0;
    flex: 1 0 auto;
`;

const apolloClient = new ApolloClient({
    link: new BatchHttpLink({
        uri: process.env.GATSBY_APOLLO_SERVER_URL,
        batchMax: 5,
        batchInterval: 25
    }),
    cache: new InMemoryCache(
        {
            typePolicies: {
                Query: {
                    fields: {
                        allWcProducts: {
                            keyArgs: ["params", ["category"]],
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

export const LangContext = createContext({
    language: 'ru',
    langPrefix: ''
});

const Layout = (props: LayoutProps) => {

    const { children, language = 'ru' } = props;

    const langContext = {
        language: language,
        langPrefix: language === 'ru' ? '' : `${language}/`
    }

    return (
        <ApolloProvider client={apolloClient} >
            <LangContext.Provider value={langContext}>
                <Header />
                <Main minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
                    {children}
                </Main>
                <Footer />
            </LangContext.Provider>
        </ApolloProvider>
    )
}

export default Layout;


