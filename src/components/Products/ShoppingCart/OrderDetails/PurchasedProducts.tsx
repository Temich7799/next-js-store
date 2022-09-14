import React from "react"
import styled from "styled-components"
import { ORDER_FINAL_BUTTON_DISABLED } from "../../../../languages/ru/languages"
import PurchasedProduct from "./PurchasedProduct"

type PurchasedProductProps = {
    name: string
    slug: string
    sku: string
    price: string
    sale_price: string
    stock_quantity: number | null
    stock_status: string
    image: {
        alt: string
        src: string
    }
    wordpress_id: number
    id: string
    quantity: number
}

type PurchasedProductsProps = {
    data: Array<PurchasedProductProps>
}

const StyledPurchasedProducts = styled.div`
    max-height: 200px;
    width: 100%;
    overflow: scroll;
`;

const PurchasedProducts = (props: PurchasedProductsProps) => {

    const { data } = props;

    return (
        <StyledPurchasedProducts id="ordered_products">
            <hr />
            {
                data && data.length > 0
                    ? data.map((product: PurchasedProductProps) => <PurchasedProduct data={product} />)
                    : <p>{ORDER_FINAL_BUTTON_DISABLED}</p>
            }
            <hr />
        </StyledPurchasedProducts>
    )
}

export default PurchasedProducts;
