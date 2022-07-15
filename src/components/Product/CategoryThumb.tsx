import * as React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image";

const StyledCategoryThumb = styled.div`
    height: 490px;
    max-width: 335px;
    border: 1px red solid;
`;

const ImageFigure = styled.figure`
    position: relative;
    max-width: 335px;
    margin: 0;
`;

const ImageCaption = styled.figcaption`
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 40px;
    background-color: #54954fac;    
`;

const Caption = styled.div`
    font-family: 'Amatic SC';
    font-size: 30px;
    height: 136px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const Line = styled.div`
    width: 50px;
    border-bottom: 1px solid rgba(0,0,0,0.25);
`;

const CategoryThumb = () => {
    return (
        <StyledCategoryThumb>
            <ImageFigure>
                <StaticImage src="../../images/logo.png" alt="Category" placeholder="blurred" height={335} />
                <ImageCaption>
                    <Line />
                    <p>Pepotes</p>
                    <Line />
                </ImageCaption>
            </ImageFigure>
            <Caption>
                <p>Magical</p>
                <button>Know more</button>
            </Caption>
        </StyledCategoryThumb>
    )
}

export default CategoryThumb;