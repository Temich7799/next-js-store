import * as React from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import ProductAttributes from "./ProductAttributes";

const StyledProductThumb = styled.div`
    height: 245px;
    width: 165px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    img {
        width:100%;
    }
`;

const ProductImage = styled.div`
    position: relative;
`;

const ProductCaption = styled.div`
    font-family: 'Amatic SC';
    font-size: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
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

    return (
        <StyledProductThumb>
            <ProductImage>
                <Link to={`${data.categories[0].slug}-${data.sku}`}>
                    <img src={data.images[0].src} alt={data.images[0].alt} />
                </Link>

            </ProductImage>
            <ProductCaption>
                <p>SKU: {data.sku}</p>
                {data.attributes.length && <ProductAttributes data={data.attributes} />}
                <p>Price: <b>{data.price}</b>$</p>
            </ProductCaption>
        </StyledProductThumb>
    )
}

export default ProductThumb;