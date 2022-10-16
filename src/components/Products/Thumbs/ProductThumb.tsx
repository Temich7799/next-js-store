import React, { useContext } from "react"
import styled from "styled-components"
import ImageSVG from "../../ImageSVG";
import Button from "../../Buttons/Button";
import ProductPrice from "../ProductPrice";
import { useShoppingCartVar } from "../../../services/hooks/apollo/useShoppingCartVar";
import { useLastProductPageVar } from "../../../services/hooks/apollo/useLastProductPageVar";
import { LangContext } from "../../Layouts/Layout";
import { ProductFetched } from "../../../types/InterfaceProduct";

type ProductProps = {
    data: ProductFetched
    gatsbyImagePath?: object | undefined | any
}

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

const ProductLink = styled.a`
    position: relative;
    display: block;
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

const ProductThumb = (props: ProductProps) => {

    const { language, langPrefix } = useContext(LangContext);
    const { PRODUCT_SKU } = require(`../../../languages/${language}/languages`);

    const { data, gatsbyImagePath } = props;
    if (data.sku == '') data.sku = data.id;

    const url = gatsbyImagePath
        ? `${process.env.GATSBY_SITE_URL}/${langPrefix}catalog/${data.categories[0].slug}/${data.categories[0].slug}-${data.sku != '' ? data.sku : data.id}`
        : `${process.env.GATSBY_SITE_URL}/${langPrefix}product?id=${data.id}`;

    const { add: addToCart } = useShoppingCartVar();
    const { save: saveLastProductPage } = useLastProductPageVar();

    function buttonOnClickHandler(): void {
        addToCart(data.id, data);
        saveLastProductPage();
    }

    function thumbOnClickHandler(): void {
        saveLastProductPage();
    }

    return (
        <StyledProductThumb onClick={thumbOnClickHandler}>
            <ProductLink href={url}>
                <img src={gatsbyImagePath ? process.env.GATSBY_SITE_URL + gatsbyImagePath : data.images[0].src} alt={data.images[0].alt} />
            </ProductLink>
            <ProductCaption>
                <div>
                    <p>{PRODUCT_SKU}: {data.sku}</p>
                    <ProductPrice price={data.price} salePrice={data.sale_price} />
                </div>
                <Button buttonSize="shrink" buttonStyle="transparent" onClick={buttonOnClickHandler}>
                    <ImageSVG path='/svg/add_to_cart.svg' height="25px" width="25px" />
                </Button>
            </ProductCaption>
        </StyledProductThumb >
    )
}

export default ProductThumb;