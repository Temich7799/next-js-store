import React, { useContext } from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import Button from "../../Buttons/Button";
import getRandomColor from "../../../services/getRandomColor";
import InteractiveImage from "../../InteractiveImage";
import { LangContext } from "../../Layouts/Layout";

type CategoryThumbProps = {
    data: {
        image: {
            src: string
            alt: string
        }
        name: string
        description: string
        slug: string
    }
}

const StyledCategoryThumb = styled.div`
    height: 490px;
    width: 335px;
    display: flex;
    flex-direction: column;
    gap: 50px;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
`;

const ImageFigure = styled.figure`
    position: relative;
    width: 335px;
    height: 55%;
    margin: 0;
    overflow: hidden;
    img {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
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
    p {
        font-family: 'Comfortaa';
        font-size: 24px;
    }    
`;

const NoImage = styled.img`
    transform: translateY(-50px);
`;

const Caption = styled.div`
    
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    p {
        font-family: 'Amatic SC';
        font-size: 30px;
    }
`;

const Line = styled.div`
    width: 50px;
    border-bottom: 1px solid rgba(0,0,0,0.25);
`;

const CategoryThumb = (props: CategoryThumbProps) => {

    const { language } = useContext(LangContext);
    const { CATEGORY_THUMB_BUTTON } = require(`../../../languages/${language}/languages`);

    const { data } = props;

    return (
        <StyledCategoryThumb>
            <ImageFigure>
                <Link to={data.slug}>
                    {
                        data.image
                            ? <InteractiveImage><img src={data.image.src} alt={data.image.alt} /></InteractiveImage>
                            : <NoImage src="https://admin.malinikids.com/wp-content/uploads/woocommerce-placeholder.png" />
                    }
                </Link>
                <ImageCaption captionColor={getRandomColor()}>
                    <Line />
                    <p dangerouslySetInnerHTML={{ __html: data.name }} />
                    <Line />
                </ImageCaption>
            </ImageFigure>
            <Caption>
                <p dangerouslySetInnerHTML={{ __html: data.description }} />
                <Link to={data.slug}>
                    <Button>{CATEGORY_THUMB_BUTTON}</Button>
                </Link>
            </Caption>
        </StyledCategoryThumb >
    )
}

export default CategoryThumb;