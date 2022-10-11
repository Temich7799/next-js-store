import React, { useContext } from "react"
import styled from "styled-components"
import ImageSVG from "../../ImageSVG";
import Button from "../../Buttons/Button";
import ProductPrice from "../ProductPrice";
import { useShoppingCartVar } from "../../../services/hooks/apollo/useShoppingCartVar";
import { useLastProductPageVar } from "../../../services/hooks/apollo/useLastProductPageVar";
import { LangContext } from "../../Layouts/Layout";

type ProductProps = {
    data: Product
    gatsbyImage?: string | undefined
}
interface Product {
    name: string
    price: string
    sku: string
    stock_quantity: number | null
    stock_status: string
    sale_price: string
    categories: [
        {
            slug: string
        }
    ]
    images: [
        {
            alt: string;
            src: string;
        }
    ]
    wordpress_id: number
}

interface ExtendedProduct extends Product {
    image: {
        src: string
        alt: string
    }
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

    const language = useContext(LangContext);
    const { PRODUCT_SKU } = require(`../../../languages/${language}/languages`);

    const { data: propsData, gatsbyImage } = props;
    if (propsData.sku == '') propsData.sku = propsData.wordpress_id.toString();

    const data: ExtendedProduct = {
        ...propsData,
        image: {
            src: gatsbyImage ? gatsbyImage : propsData.images[0].src,
            alt: propsData.images[0].alt
        }
    };

    const url = gatsbyImage
        ? `${process.env.GATSBY_SITE_URL}/catalog/${data.categories[0].slug}/${data.categories[0].slug}-${data.sku != '' ? data.sku : data.wordpress_id}`
        : `${process.env.GATSBY_SITE_URL}/product?id=${data.wordpress_id}`;

    const { add: addToCart } = useShoppingCartVar();
    const { save: saveLastProductPage } = useLastProductPageVar();

    function buttonOnClickHandler(): void {
        addToCart(data.wordpress_id, data);
        saveLastProductPage();
    }

    function thumbOnClickHandler(): void {
        saveLastProductPage();
    }

    return (
        <StyledProductThumb onClick={thumbOnClickHandler}>
            <ProductLink href={url}>
                <img src={data.image.src} alt={data.image.alt} />
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