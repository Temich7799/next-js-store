import React from "react"
import styled from "styled-components"
import { PRODUCT_BUY_BUTTON_TITLE, PRODUCT_OUT_OF_STOCK_BUTTON_TITLE } from "../../../languages/ru/languages";
import Button from "../../Button";
import ImageSVG from "../../ImageSVG";
import ProductPrice from "../ProductPrice";
import { useShoppingCartVar } from "../../../services/hooks/useShoppingCartVar";
import useUpdatedProduct from "../../../services/hooks/useUpdatedProduct";

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
        image: {
            alt: string
            src: string
        }
        wordpress_id: number
    }
}

type FetchedData = {
    name: string
    slug: string
    sku: string
    wordpress_id: number
    price: string
    stock_status: string
    stock_quantity: number | null
    sale_price: string
    image: {
        alt: string
        src: string
    }
}

const ProductBuy = (props: ProductBuyProps) => {

    const { data } = props;

    const { loading: isDataLoading, updatedData, isOutOfStock } = useUpdatedProduct(data);

    const { add } = useShoppingCartVar();

    function buttonOnClickHandler() {
        add(data.wordpress_id, updatedData);
    }

    return (
        <StyledProductBuy>
            <ProductPrice price={updatedData.price} salePrice={updatedData.sale_price} isPriceLoading={isDataLoading} />
            <Button id="shoppingCartButton" onClick={buttonOnClickHandler} disabled={isDataLoading || isOutOfStock}>
                <>
                    {
                        isOutOfStock
                            ? PRODUCT_OUT_OF_STOCK_BUTTON_TITLE
                            : PRODUCT_BUY_BUTTON_TITLE
                    }
                    <ImageSVG path="/svg/add_to_cart.svg" height="25px" width="25px" />
                </>
            </Button>
        </StyledProductBuy >
    )
}

export default ProductBuy;