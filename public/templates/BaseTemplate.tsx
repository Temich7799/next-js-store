import React, { createContext } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import styled from "styled-components";
import { GlobalStyle } from "../styles/GlobalStyle";
import { BaseTemplateProps } from "../types/BaseTemplatePropsType";

const Main = styled.main<any>`
    @media (max-width: ${props => props.minDesktopWidth}px) {
        margin-top: 105px;
    }
    margin-top: 0;
    flex: 1 0 auto;
`;

const BaseTemplate = (props: BaseTemplateProps) => {

    const { data, children, language = 'ru' } = props;

    const pageContext = {
        language: language,
        langPrefix: language === 'ru' ? '' : `${language}/`,
        menuItems: data.menuItems
    }

    return (
        <ApolloProvider client={apolloClient} >
            <PageContext.Provider value={pageContext}>
                <GlobalStyle />
                <Header />
                <Main minDesktopWidth={process.env.NEXT_PUBLIC_MIN_DESKTOP_WIDTH}>
                    {children}
                </Main>
                <Footer />
            </PageContext.Provider>
        </ApolloProvider>
    )
}

export default BaseTemplate;

export const PageContext = createContext({
    language: 'ru',
    langPrefix: '',
    menuItems: {
        headerMenuItems: new Array,
        footerMenuItems: new Array,
        allWcProductsCategories: new Array
    }
});

export const apolloClient = new ApolloClient({
    link: new BatchHttpLink({
        uri: process.env.NEXT_PUBLIC_APOLLO_SERVER_URL,
        batchMax: 5,
        batchInterval: 25
    }),
    cache: new InMemoryCache(
        {
            typePolicies: {
                Query: {
                    fields: {
                        allWcProducts: {
                            keyArgs: ["params", ["category", "include", "after", "on_sale"]],
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

