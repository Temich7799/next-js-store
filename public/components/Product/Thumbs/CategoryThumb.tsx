import React, { useContext } from "react"
import Link from 'next/link';
import styled from "styled-components"
import Button from "../../Buttons/Button";
import getRandomColor from "../../../services/getRandomColor";
import InteractiveImageWrapper from "../../Wrappers/InteractiveImageWrapper";
import { PageContext } from "../../../templates/BaseTemplate";
import Image from "next/image";

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
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    text-align: center;
    justify-content: space-around;
    width: 100%;
    height: 40px;
    background-color: ${props => props.captionColor};
    p {
        font-family: 'Montserrat';
        font-size: 20px;
        font-weight: 500;
    }    
`;

const NoImage = styled.img`
    transform: translateY(-50px);
`;

const Caption = styled.div`
    
    width: 100%;
    height: 32.5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    p {
        text-align: center;
        font-family: 'Montserrat';
        overflow: scroll;
    }
`;

const Line = styled.div`
    width: 50px;
    border-bottom: 1px solid rgba(0,0,0,0.25);
`;

const CategoryThumb = (props: CategoryThumbProps) => {

    const { language } = useContext(PageContext);
    const { CATEGORY_THUMB_BUTTON } = require(`../../../languages/${language}/languages`);

    const { data } = props;

    return (
        <StyledCategoryThumb>
            <ImageFigure>
                <Link href={`catalog/${data.slug}`}>
                    {
                        data.image
                            ? <InteractiveImageWrapper><Image src={data.image.src} alt={data.image.alt} width={335} height={335} quality={85} /></InteractiveImageWrapper>
                            : <NoImage src={`https://${process.env.NEXT_PUBLIC_WP_HOST}/wp-content/uploads/woocommerce-placeholder.png`} />
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
                <Link href={`catalog/${data.slug}`}>
                    <Button>{CATEGORY_THUMB_BUTTON}</Button>
                </Link>
            </Caption>
        </StyledCategoryThumb >
    )
}

export default CategoryThumb;