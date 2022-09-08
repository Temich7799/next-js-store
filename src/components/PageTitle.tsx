import { StaticImage } from "gatsby-plugin-image";
import * as React from "react"
import styled from "styled-components"
import getRandomColor from "../services/getRandomColor";
import CopyProtectedArea from "./CopyProtectedArea";

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
        z-index: 10;
    }
    img {
        position: absolute;
    }
`;

type TitleProps = { children: string }

const PageTitle = (props: TitleProps) => {

    const { children } = props;

    return (
        <CopyProtectedArea>
            <StyledTitle backgroundColor={getRandomColor()}>
                <h1>{children}</h1>
                <StaticImage src="../images/title-background.png" alt="Title" placeholder="blurred" />
            </StyledTitle>
        </CopyProtectedArea>
    )
}

export default PageTitle;