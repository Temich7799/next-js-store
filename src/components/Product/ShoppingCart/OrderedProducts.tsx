import React from "react"
import styled from "styled-components"
import { ORDER_FINAL_BUTTON_DISABLED, PRODUCT_SKU } from "../../../languages/ru/languages";
import ProductPrice from "../ProductPrice";
import OrderedProductQuantity from "./OrderedProductQuantity";

const StyledOrderedProducts = styled.div`
    max-height: 200px;
    width: 100%;
    overflow: scroll;
`;

const OrderedProductDetails = styled.div`
    height: fit-content;
    width: 100%;
    max-width: 430px;
    margin: 5px 0;
    display: grid;
    grid-template-columns: 65px 0.5fr 1fr 0.8fr;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
`;

const OrderedProductThumb = styled.img`
    width: 65px;
    height: 65px;
    object-fit: cover;
`;

const OrderedProductName = styled.div`
    p {
        display: inline-block;
        margin: 2.5% 0;
        font-weight: 700;
        :nth-child(2n) {
            font-weight: 400;
            font-size: 12px;
        }
    } 
`;

type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    image: { src: string, alt: string }
    product_id: number
    quantity: number
}

const OrderedProducts = (props: any) => {

    const { data } = props;

    return (
        <StyledOrderedProducts id="ordered_products">
            <hr />
            {
                data && data.length
                    ? data.map((product: Product) =>
                        <OrderedProductDetails>
                            <OrderedProductThumb src={product.image.src} alt={product.image.alt} />
                            <ProductPrice price={product.price} salePrice={product.sale_price} />
                            <OrderedProductName>
                                <p>{product.name}</p>
                                <p>{PRODUCT_SKU}: {product.sku}</p>
                            </OrderedProductName>
                            <OrderedProductQuantity data={product} />
                        </OrderedProductDetails>
                    )
                    : <p>{ORDER_FINAL_BUTTON_DISABLED}</p>
            }
            <hr />
        </StyledOrderedProducts>
    )
}

export default OrderedProducts;
