import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { LangContext } from "../../../Layouts/Layout"
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

    const { language } = useContext(LangContext);
    const { ORDER_FINAL_BUTTON_DISABLED } = require(`../../../../languages/${language}/languages`);

    const { data } = props;

    const [shoppingCartProductsData, setShoppingCartProductsData] = useState<Array<PurchasedProductProps>>();
    useEffect(() => { setShoppingCartProductsData(data) }, [data]);

    return (
        <StyledPurchasedProducts id="ordered_products">
            <hr />
            {
                shoppingCartProductsData
                    ? shoppingCartProductsData.map((product: PurchasedProductProps) => <PurchasedProduct data={product} key={product.wordpress_id} />)
                    : <p>{ORDER_FINAL_BUTTON_DISABLED}</p>
            }
            <hr />
        </StyledPurchasedProducts>
    )
}

export default PurchasedProducts;
