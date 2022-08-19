import { StaticImage } from "gatsby-plugin-image";
import * as React from "react"
import styled from "styled-components"
import getRandomColor from "../services/getRandomColor";

type StyledTitleProps = { backgroundColor: string }

const StyledTitle = styled.div<StyledTitleProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 115px;
    background-color: ${props => props.backgroundColor};
    overflow: hidden;
    h1 {
        position: absolute;
        font-weight: 700;
        font-size: 60px;
        margin: 0;
        z-index: 100;
    }
    img {
        position: absolute;
    }
`;

type TitleProps = { children: string }

const PageTitle = (props: TitleProps) => {

    const { children } = props;

    return (
        <StyledTitle backgroundColor={getRandomColor()}>
            <h1>{children}</h1>
            <StaticImage src="../images/title-background.png" alt="Title" placeholder="blurred" />
        </StyledTitle>
    )
}

export default PageTitle;