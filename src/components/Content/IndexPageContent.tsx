import { gql, useQuery } from "@apollo/client";
import React, { useContext } from "react"
import styled from "styled-components";
import { LangContext } from "../Layouts/Layout";
import PageTitle from "../PageTitle";

type IndexPageContentData = {
    wpPage: {
        content: {
            rendered: string
        }
    }
}

const StyledIndexPageContent = styled.div`
    max-width: 1700px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 50px;
    padding: 2.5%;
`;

const IndexPageContent = () => {

    const { language } = useContext(LangContext);

    const { data } = useQuery(gql`
        query getHomePage($language: LanguagesEnum) {
            wpPage(pageId: 25, language: $language) {
                content {
                    rendered
                }
            }
        }
    `,
        {
            variables: {
                language: language
            }
        }
    );

    return (
        <>
            {
                data && <StyledIndexPageContent dangerouslySetInnerHTML={{ __html: data.wpPage.content.rendered }} />
            }
        </>
    )

}

export default IndexPageContent