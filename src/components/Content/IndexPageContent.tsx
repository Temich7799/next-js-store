import React from "react"
import styled from "styled-components";
import PageTitle from "../PageTitle";

type IndexPageContentProps = {
    data: {
        content: string
        title: string
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

const IndexPageContent = (props: IndexPageContentProps) => {

    const { data } = props;

    return (
        <>
            <PageTitle>{data.title}</PageTitle>
            <StyledIndexPageContent dangerouslySetInnerHTML={{ __html: data.content }} />
        </>
    )

}

export default IndexPageContent