import React, { useEffect } from "react"
import styled from "styled-components"
import { useShoppingCartVar } from "../../../../services/hooks/apollo/useShoppingCartVar"
import useUpdatedProduct from "../../../../services/hooks/useUpdatedProduct"
import ProductPrice from "../../ProductPrice"
import PurchasedProductQuantity from "./PurchasedProductQuantity"
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
    grid-template-columns: auto 55px auto 1fr;
    justify-content: space-around;
    align-items: center;
    gap: 2%;
`;

const PurchasedProductThumb = styled.img`
    width: 60px;
    height: 60px;
    object-fit: cover;
`;

const PurchasedProductName = styled.div`
    padding-right: 3.5px;
    p {
        margin: 0;
        font-size: 11px;
        display: inline-block;
        margin: 2.5% 0;
        font-weight: 700;
    } 
`;

const PurchasedProduct = (props: PurchasedProductProps) => {

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
            </PurchasedProductName>
            <PurchasedProductQuantity data={data} />
        </StyledPurchasedProduct>
    )
}

export default PurchasedProduct;