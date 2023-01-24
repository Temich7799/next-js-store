import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import { useShoppingCartVar } from "../../../services/hooks/apollo_vars/useShoppingCartVar"
import useUpdatedProduct from "../../../services/hooks/useUpdatedProduct"
import ProductPrice from "../../Product/ProductPrice"
import PurchasedProductQuantity from "./PurchasedProductQuantity"
import { ProductInCart } from "../../../interfaces/InterfaceProduct"
import { PageContext } from "../../Layouts/Layout"

type PurchasedProductProps = {
    data: ProductInCart
}

const StyledPurchasedProduct = styled.div`
    height: fit-content;
    width: 97%;
    max-width: 430px;
    margin: 5px 0;
    display: grid;
    grid-template-columns: auto 2fr 65px 1fr;
    justify-content: space-around;
    align-items: center;
    gap: 2%;
`;

const PurchasedProductThumb = styled.div`
   img {
    width: 60px;
    height: 60px !important;
    object-fit: cover;
   }
`;

const PurchasedProductName = styled.div`
    padding-right: 3.5px;
    p {
        margin: 0;
        font-size: 11px;
        display: inline-block;
        margin: 2.5% 0;
    } 
`;

const PurchasedProduct = (props: PurchasedProductProps) => {

    const { language } = useContext(PageContext);
    const { NO_PRODUCT_IMAGE } = require(`../../../languages/${language}/languages`);

    const { data } = props;

    const { loading: isDataLoading, data: updatedData, isOutOfStock } = useUpdatedProduct(data);
    const { update, clear } = useShoppingCartVar();

    const imageSource = data.images.length > 0 ? data.images[0].src : 'https://admin.malinikids.com/wp-content/uploads/woocommerce-placeholder.png';
    const imageAlt = data.images.length > 0 ? data.images[0].alt : NO_PRODUCT_IMAGE;

    useEffect(() => {
        updatedData && update(data.id, updatedData);
    }, [updatedData]);
    useEffect(() => { isOutOfStock && clear(data.id); }, [isOutOfStock]);

    return (
        <StyledPurchasedProduct>
            <PurchasedProductThumb>
                <img src={imageSource} alt={imageAlt} />
            </PurchasedProductThumb>
            <PurchasedProductName>
                <p>{updatedData ? updatedData.name : data.name}</p>
            </PurchasedProductName>
            <ProductPrice price={updatedData.price} salePrice={updatedData.sale_price} isPriceLoading={isDataLoading} showTitle={false} />
            <PurchasedProductQuantity data={data} />
        </StyledPurchasedProduct>
    )
}

export default PurchasedProduct;