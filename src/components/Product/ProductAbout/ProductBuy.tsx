import React, { useEffect } from "react"
import styled from "styled-components"
import { PRODUCT_BUY_BUTTON_TITLE, PRODUCT_OUT_OF_STOCK_BUTTON_TITLE } from "../../../languages/ru/languages";
import Button from "../../Button";
import ImageSVG from "../../ImageSVG";
import ProductPrice from "../ProductPrice";
import { addToCartResolver } from "../../../graphql/vars/shoppingCartVar";
import { useLazyQuery } from "@apollo/client";
import { GET_PRODUCT_PRICE } from "../../../graphql/queries/getProductPrice";

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
        price: string
        sale_price: string
        sku: string
        images: [{
            alt: string
            localFile: any
        }]
        wordpress_id: number
    }
}

const ProductBuy = (props: ProductBuyProps) => {

    const productId = props.data.wordpress_id;

    const [getProductPrice, { loading, error, data }] = useLazyQuery(GET_PRODUCT_PRICE);
    useEffect(() => {
        getProductPrice({ variables: { wpWcProductId: productId } });
    }, []);

    useEffect(() => {
        if (data) {
            props.data.price = data.wpWcProduct.price;
            props.data.sale_price = data.wpWcProduct.sale_price;
        }
    }, [data]);

    function buttonOnClickHandler() {
        addToCartResolver(productId, props.data);
    }

    return (
        <StyledProductBuy>
            <ProductPrice price={data && data.wpWcProduct.price} salePrice={data && data.wpWcProduct.sale_price} />
            <Button id="shoppingCartButton" onClick={buttonOnClickHandler} disabled={loading || data && data.wpWcProduct.purchasable == false}>
                <>
                    {
                        data
                            ? data.wpWcProduct.purchasable
                                ? PRODUCT_BUY_BUTTON_TITLE
                                : PRODUCT_OUT_OF_STOCK_BUTTON_TITLE
                            : PRODUCT_BUY_BUTTON_TITLE
                    }
                    <ImageSVG path="/svg/add_to_cart.svg" height="25px" width="25px" />
                </>
            </Button>
        </StyledProductBuy >
    )
}

export default ProductBuy;