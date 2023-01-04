import React from "react"
import styled from "styled-components"
import CopyProtectedWrapper from "./Wrappers/CopyProtectedWrapper";

type PageTitleProps = { children: string }

const StyledPageTitle = styled.div`
    height: 115px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1.25%;
    text-transform: uppercase;
    h1 {
        text-align: center;
        color: #9ed6e4;
        font-size: 40px;
    }
`;

const Line = styled.div`
    width: 100%;
    border-top: 5px dashed #ffd5e6;;
`;

const PageTitle = (props: PageTitleProps) => {

    const { children } = props;

    return (
        <CopyProtectedWrapper>
            <StyledPageTitle>
                <Line />
                <h1>
                    {children}
                </h1>
                <Line />
            </StyledPageTitle>
        </CopyProtectedWrapper >
    )
}

export default PageTitle;