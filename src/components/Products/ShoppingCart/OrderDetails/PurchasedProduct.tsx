import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { useShoppingCartVar } from "../../../../services/hooks/apollo/useShoppingCartVar"
import useUpdatedProduct from "../../../../services/hooks/useUpdatedProduct"
import ProductPrice from "../../ProductPrice"
import PurchasedProductQuantity from "./PurchasedProductQuantity"
import { LangContext } from "../../../Layouts/Layout"
import { ProductInCart } from "../../../../interfaces/InterfaceProduct"

type PurchasedProductProps = {
    data: ProductInCart
}

const StyledPurchasedProduct = styled.div`
    height: fit-content;
    width: 97%;
    max-width: 430px;
    margin: 5px 0;
    display: grid;
    grid-template-columns: auto 0.25fr auto 1fr;
    justify-content: space-around;
    align-items: center;
    gap: 2%;
`;

const PurchasedProductThumb = styled.img`
    width: 65px;
    height: 65px;
    object-fit: cover;
`;

const PurchasedProductName = styled.div`
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

const PurchasedProduct = (props: PurchasedProductProps) => {

    const { language } = useContext(LangContext);
    const { PRODUCT_SKU } = require(`../../../../languages/${language}/languages`);

    const { data } = props;

    const { loading: isDataLoading, data: updatedData, isOutOfStock } = useUpdatedProduct(data);
    const { update, clear } = useShoppingCartVar();

    useEffect(() => {
        updatedData && update(data.id, updatedData);
    }, [updatedData]);
    useEffect(() => { isOutOfStock && clear(data.id); }, [isOutOfStock]);

    return (
        <StyledPurchasedProduct>
            <PurchasedProductThumb src={data.images[0].src} alt={data.images[0].alt} />
            <ProductPrice price={updatedData.price} salePrice={updatedData.sale_price} isPriceLoading={isDataLoading} />
            <PurchasedProductName>
                <p>{updatedData ? updatedData.name : data.name}</p>
                <p>{PRODUCT_SKU}: {data.sku}</p>
            </PurchasedProductName>
            <PurchasedProductQuantity data={data} />
        </StyledPurchasedProduct>
    )
}

export default PurchasedProduct;