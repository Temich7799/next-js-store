import * as React from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import Button from "../Button";

const StyledCategoryThumb = styled.div`
    height: 490px;
    max-width: 335px;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
`;

const ImageFigure = styled.figure`
    position: relative;
    max-width: 335px;
    margin: 0;
    img {
        width: 100%;
    }
`;

type ImageCaptionProps = { captionColor: string }

const ImageCaption = styled.figcaption<ImageCaptionProps>`
    position: absolute;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 40px;
    background-color: ${props => props.captionColor};    
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

const CategoryThumb = ({ data }: any) => {

    function randomCaptionColor() {
        const colors = ['#b4dcd7b5', '#c8ebc3b5', '#fadc87b5', '#facdd7b5', '#aac8d7b5', '#ffaf96b5',];
        return colors[Math.floor(Math.random() * colors.length)]
    }

    return (
        <StyledCategoryThumb>
            <ImageFigure>
                <img src={data.image.src} alt={data.image.alt} />
                <ImageCaption captionColor={randomCaptionColor()}>
                    <Line />
                    <p>{data.name}</p>
                    <Line />
                </ImageCaption>
            </ImageFigure>
            <Caption>
                <p>{data.description}</p>
                <Link to={data.slug}>
                    <Button>Know more</Button>
                </Link>
            </Caption>
        </StyledCategoryThumb >
    )
}

export default CategoryThumb;