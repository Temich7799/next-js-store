import React, { useState } from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import { getHeightAttribute } from "../../services/attributes";
import ImageSVG from "../ImageSVG";
import ProductAttributes from "./ProductAttributes";

const StyledProductThumb = styled.div`
    height: 280px;
    width: 165px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    img {
        width:100%;
        height: 220px;
        object-fit: cover;
    }
`;

const ProductImage = styled.div`
    position: relative;
`;

const ProductThumbAttributesSlider = styled.div`
    position: absolute; 
    top: 0;
    right: 0;
    width: 50px;
    height: 92%;
    padding: 5px 0;
    overflow: scroll;
`;

const ProductCaption = styled.div`
    font-family: 'Amatic SC';
    font-size: 20px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
        margin: 0;
    }
`;

type ProductAttribute = {
    options: [string]
    name: string
}

type ProductProps = {
    data: {
        slug: string
        sku: string
        price: string
        images: [{
            src: string
            alt: string
        }]
        categories: [
            { slug: string }
        ]
        attributes: [ProductAttribute]
    }
}

const ProductThumb = (props: ProductProps) => {

    const { data } = props;

    const [isMouseOver, setMouseOver] = useState(false);

    const height = getHeightAttribute(data.attributes);

    return (
        <StyledProductThumb>
            <ProductImage onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
                <Link to={`${data.categories[0].slug}-${data.sku}`}>
                    <img src={data.images[0].src} alt={data.images[0].alt} />
                    {
                        data.attributes.length && isMouseOver &&
                        <ProductThumbAttributesSlider>
                            <ProductAttributes data={data.attributes} />
                        </ProductThumbAttributesSlider>
                    }
                </Link>
            </ProductImage>
            <ProductCaption>
                <div>
                    <p>SKU: {data.sku}</p>
                    <p>Price: <b>{data.price}</b>$</p>
                </div>
                {height != undefined && <p><ImageSVG path='/svg/height.svg' height="100%" />{height.options[0]}</p>}
            </ProductCaption>
        </StyledProductThumb>
    )
}

export default ProductThumb;