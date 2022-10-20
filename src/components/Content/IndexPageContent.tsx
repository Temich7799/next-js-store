import React from "react"
import styled from "styled-components";

type IndexPageContentProps = {
    data: {
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

const IndexPageContent = (props: IndexPageContentProps) => {

    const { data } = props;

    return (
        <>
            <StyledIndexPageContent dangerouslySetInnerHTML={{ __html: data.content.rendered }} />
        </>
    )

}

export default IndexPageContent