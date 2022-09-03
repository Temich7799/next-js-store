import React from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import ImageSVG from "../../ImageSVG";
import Button from "../../Button";
import { useDispatch } from 'react-redux'
import ProductPrice from "../ProductPrice";
import { PRODUCT_SKU } from "../../../languages/ru/languages";
import { addToShoppingCart } from "../../../store/shoppingCartSlice";

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

type ProductAttribute = {
    options: [string]
    name: string
}

type ProductProps = {
    data: {
        name: string
        slug: string
        sku: string
        price: string
        sale_price: string
        images: [{
            src: string
            alt: string
        }]
        categories: [
            { slug: string }
        ]
        attributes: [ProductAttribute]
        wordpress_id: number
    }
}

const ProductThumb = (props: ProductProps) => {

    const { data } = props;

    const product = {
        "name": data.name,
        "sku": data.sku,
        "price": data.price,
        "sale_price": data.sale_price,
        "image": { src: data.images[0].src, alt: data.images[0].alt },
        "product_id": data.wordpress_id,
        "quantity": 1
    };

    const dispath = useDispatch();

    function buttonOnClickHandler() {
        dispath(addToShoppingCart(product));
    }

    return (
        <StyledProductThumb>
            <ProductImage>
                <Link to={`${data.categories[0].slug}-${data.sku}`}>
                    <img src={data.images[0].src} alt={data.images[0].alt} />
                </Link>
            </ProductImage>
            <ProductCaption>
                <div>
                    <p>{PRODUCT_SKU}: {data.sku}</p>
                    <ProductPrice price={data.price} salePrice={data.sale_price} />
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