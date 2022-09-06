import * as React from "react"
import styled from "styled-components"
import { PRODUCT_BUY_BUTTON_TITLE } from "../../../languages/ru/languages";
import Button from "../../Button";
import ImageSVG from "../../ImageSVG";
import ProductPrice from "../ProductPrice";
import { addToCartResolver } from "../../../graphql/vars/shoppingCartVar";

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
            alt: string
            localFile: any
        }]
        wordpress_id: number
    }
}

const ProductBuy = (props: ProductBuyProps) => {

    const { data } = props;
    const { price, sale_price, wordpress_id } = data;

    function buttonOnClickHandler() {
        addToCartResolver(wordpress_id, data);
    }

    return (
        <StyledProductBuy>
            <ProductPrice price={price} salePrice={sale_price} />
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