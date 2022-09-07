import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { PRODUCT_BUY_BUTTON_TITLE, PRODUCT_OUT_OF_STOCK_BUTTON_TITLE } from "../../../languages/ru/languages";
import Button from "../../Button";
import ImageSVG from "../../ImageSVG";
import ProductPrice from "../ProductPrice";
import { addToCartResolver, updatePurchasedProductPriceResolver } from "../../../graphql/vars/shoppingCartVar";
import { gql, useLazyQuery } from "@apollo/client";

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
        price?: string
        sale_price?: string
        sku: string
        images: [{
            alt: string
            localFile: any
        }]
        wordpress_id: number
    }
}

const ProductBuy = (props: ProductBuyProps) => {

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

            updatePrice()
        }
    }, [fetchedData]);

    function updatePrice() {
        updatePurchasedProductPriceResolver(data.wordpress_id, data);
        data.price = fetchedData.wpWcProduct.price;
        data.sale_price = fetchedData.wpWcProduct.sale_price;
    }

    function buttonOnClickHandler() {
        addToCartResolver(data.wordpress_id, data);
    }

    return (
        <StyledProductBuy>
            <ProductPrice price={fetchedData && fetchedData.wpWcProduct.price} salePrice={fetchedData && fetchedData.wpWcProduct.sale_price} />
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