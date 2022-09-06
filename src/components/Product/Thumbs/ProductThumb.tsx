import React from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import ImageSVG from "../../ImageSVG";
import Button from "../../Button";
import ProductPrice from "../ProductPrice";
import { PRODUCT_SKU } from "../../../languages/ru/languages";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { addToCartResolver } from "../../../graphql/vars/shoppingCartVar";

const StyledProductThumb = styled.div`
    height: 320px;
    min-width: 225px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    img {
        width:100%;
        height: 240px;
        object-fit: cover;
    }
`;

const ProductImage = styled.div`
    position: relative;
`;

const ProductCaption = styled.div`
    font-family: 'Amatic SC';
    font-size: 20px;
    height: 55px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
        margin: 0;
    }
`;

type Product = {
    name: string
    price: string
    sku: string
    sale_price: string
    slug: string
    images: [
        {
            alt: string
            localFile: any
        }
    ]
    categories: [
        {
            slug: string
        }
    ]
    wordpress_id: number
    image: { alt: string }
}

type ProductProps = {
    data: Product
}

const ProductThumb = (props: ProductProps) => {

    const { data } = props;
    const { sku, price, categories, sale_price, images, wordpress_id } = data;

    const image = getImage(images[0].localFile)


    function buttonOnClickHandler() {
        addToCartResolver(wordpress_id, data);
    }

    return (
        <StyledProductThumb>
            <ProductImage>
                <Link to={`${categories[0].slug}-${sku}`}>
                    <GatsbyImage image={image} alt={images[0].alt} />
                </Link>
            </ProductImage>
            <ProductCaption>
                <div>
                    <p>{PRODUCT_SKU}: {sku}</p>
                    <ProductPrice price={price} salePrice={sale_price} />
                </div>
                <div>
                    <Button id="shoppingCartButton" buttonSize="shrink" buttonStyle="transparent" onClick={buttonOnClickHandler}>
                        <ImageSVG path='/svg/add_to_cart.svg' height="25px" width="25px" />
                    </Button>
                </div>
            </ProductCaption>
        </StyledProductThumb>
    )
}

export default ProductThumb;