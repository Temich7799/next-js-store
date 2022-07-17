import { Link } from "gatsby";
import * as React from "react"
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

const CategoryThumb = ({ data }: any) => {
    console.log(data);
    return (
        <StyledCategoryThumb>
            <ImageFigure>
                <img src={data.node.image.src} alt={data.node.image.alt} />
                <ImageCaption>
                    <Line />
                    <p>{data.node.name}</p>
                    <Line />
                </ImageCaption>
            </ImageFigure>
            <Caption>
                <p>{data.node.description}</p>
                <Link to={data.node.slug}>
                    <Button>Know more</Button>
                </Link>
            </Caption>
        </StyledCategoryThumb >
    )
}

export default CategoryThumb;