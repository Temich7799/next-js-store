import { gql, useLazyQuery } from "@apollo/client"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { deletePurchasedProductResolver, updatePurchasedProductPriceResolver } from "../../../graphql/vars/shoppingCartVar"
import { PRODUCT_SKU } from "../../../languages/ru/languages"
import ProductPrice from "../ProductPrice"
import PurchasedProductQuantity from "./PurchasedProductQuantity"

type PurchasedProductProps = {
    data: {
        name: string
        slug: string
        sku: string
        price: string
        sale_price: string
        images: [{
            alt: string
            localFile: any
        }]
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

    const [isOutOfStock, setIsOutOfStock] = useState<boolean>(false);

    const [getProductFetchData, { loading: isDataLoading, error: dataFetchError, data: fetchedData }] = useLazyQuery(gql`
        query getProductFetchData($wpWcProductId: Int!) {
            wpWcProduct(id: $wpWcProductId) {
                price
                sale_price
                stock_status
                stock_quantity
                manage_stock
            }
    }
    `);

    useEffect(() => {
        getProductFetchData({ variables: { wpWcProductId: data.wordpress_id } });
    }, []);

    useEffect(() => {
        if (fetchedData) {

            setIsOutOfStock(
                fetchedData.wpWcProduct.stock_status == 'instock' || fetchedData.wpWcProduct.stock_quantity > 0
                    ? false
                    : true
            );

            updatePrice();
        }
    }, [fetchedData]);

    function updatePrice() {
        updatePurchasedProductPriceResolver(data.wordpress_id, data);
        data.price = fetchedData.wpWcProduct.price;
        data.sale_price = fetchedData.wpWcProduct.sale_price;
    }

    useEffect(() => { isOutOfStock && deletePurchasedProductResolver(data.wordpress_id); }, [isOutOfStock]);

    return (
        <StyledPurchasedProduct>
            <PurchasedProductThumb src={data.images[0].localFile.childImageSharp.gatsbyImageData.images.fallback.src} alt={data.images[0].alt} />
            <ProductPrice price={fetchedData && fetchedData.wpWcProduct.price} salePrice={fetchedData && fetchedData.wpWcProduct.sale_price} />
            <PurchasedProductName>
                <p>{data.name}</p>
                <p>{PRODUCT_SKU}: {data.sku}</p>
            </PurchasedProductName>
            <PurchasedProductQuantity data={data} />
        </StyledPurchasedProduct>
    )
}

export default PurchasedProduct;