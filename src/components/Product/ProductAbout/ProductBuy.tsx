import * as React from "react"
import styled from "styled-components"
import { PRODUCT_BUY_BUTTON_TITLE } from "../../../languages/ru/languages";
import { useDispatch } from 'react-redux'
import { addToShoppingCart } from "../../../store/shoppingCartSlice";
import Button from "../../Button";
import ImageSVG from "../../ImageSVG";
import ProductPrice from "../ProductPrice";

const StyledProductBuy = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 10px 0;
`;

type ProductBuyProps = {
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
        wordpress_id: number
    }
}

const ProductBuy = (props: ProductBuyProps) => {

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
        <StyledProductBuy>
            <ProductPrice price={data.price} salePrice={data.sale_price} />
            <Button id="shoppingCartButton" onClick={buttonOnClickHandler}>
                <>
                    {PRODUCT_BUY_BUTTON_TITLE}
                    <ImageSVG path="/svg/add_to_cart.svg" height="25px" width="25px" />
                </>
            </Button>
        </StyledProductBuy >
    )
}

export default ProductBuy;