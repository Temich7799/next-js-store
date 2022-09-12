import React, { useEffect } from "react"
import styled from "styled-components"
import { deletePurchasedProductResolver } from "../../../../graphql/vars/shoppingCartVar"
import { PRODUCT_SKU } from "../../../../languages/ru/languages"
import useFetchedProducts from "../../../../services/hooks/useUpdatedProduct"
import ProductPrice from "../../ProductPrice"
import PurchasedProductQuantity from "./PurchasedProductQuantity"

type PurchasedProductProps = {
    data: {
        name: string
        slug: string
        sku: string
        price: string
        sale_price: string
        stock_status: string
        stock_quantity: number | null
        image: {
            alt: string
            src: string
        }
        wordpress_id: number
        quantity: number
    }
}

const StyledPurchasedProduct = styled.div`
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

    const { data } = props;

    const { data: fetchedData, isOutOfStock } = useFetchedProducts(data);

    useEffect(() => { isOutOfStock && deletePurchasedProductResolver(data.wordpress_id); }, [isOutOfStock]);

    return (
        <StyledPurchasedProduct>
            <PurchasedProductThumb src={data.image.src} alt={data.image.alt} />
            <ProductPrice showTitle={false} price={fetchedData && fetchedData.wpWcProduct.price} salePrice={fetchedData && fetchedData.wpWcProduct.sale_price} />
            <PurchasedProductName>
                <p>{data.name}</p>
                <p>{PRODUCT_SKU}: {data.sku}</p>
            </PurchasedProductName>
            <PurchasedProductQuantity data={data} />
        </StyledPurchasedProduct>
    )
}

export default PurchasedProduct;