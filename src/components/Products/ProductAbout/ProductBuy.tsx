import React, { useContext } from "react"
import styled from "styled-components"
import { PRODUCT_BUY_BUTTON_TITLE, PRODUCT_OUT_OF_STOCK_BUTTON_TITLE } from "../../../languages/ru/languages";
import Button from "../../Buttons/Button";
import ImageSVG from "../../ImageSVG";
import ProductPrice from "../ProductPrice";
import { useShoppingCartVar } from "../../../services/hooks/useShoppingCartVar";
import useUpdatedProduct from "../../../services/hooks/useUpdatedProduct";
import { PageContext } from "../ProductPageContent";
import ProductBuyButton from "../../Buttons/ProductBuyButton";

const StyledProductBuy = styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    margin: 10px 0;
`;

type ProductBuy = {
    name: string
    slug: string
    sku: string
    image: {
        alt: string
        src: string
    }
    wordpress_id: number
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

const ProductBuy = () => {

    const data: ProductBuy = useContext(PageContext);

    const { loading: isDataLoading, updatedData, isOutOfStock } = useUpdatedProduct(data);

    const { add } = useShoppingCartVar();

    function buttonOnClickHandler() {
        add(data.wordpress_id, updatedData);
    }

    return (
        <StyledProductBuy>
            <ProductPrice price={updatedData.price} salePrice={updatedData.sale_price} isPriceLoading={isDataLoading} />
            <ProductBuyButton onClickHandler={buttonOnClickHandler} isDataLoading={isDataLoading} isOutOfStock={isOutOfStock} />
        </StyledProductBuy >
    )
}

export default ProductBuy;