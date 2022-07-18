import { StaticImage } from "gatsby-plugin-image";
import * as React from "react"
import styled from "styled-components"

const StyledTitle = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 115px;
    background-color: #facdd7b5;
    overflow: hidden;
    h1 {
        position: absolute;
        font-family: 'Amatic SC';
        font-weight: 700;
        font-size: 60px;
        margin: 0;
        z-index: 100;
    }
    img {
        position: absolute;
    }
`;

type TitleProps = {
    children: string
}

const TitleH1 = (props: TitleProps) => {

    const { children } = props;

    return (
        <StyledTitle>
            <h1>{children}</h1>
            <StaticImage src="../images/title-background.png" alt="Title" placeholder="blurred" />

        </StyledTitle>
    )
}

export default TitleH1;