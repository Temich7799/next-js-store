import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { PRODUCT_BUY_BUTTON_TITLE, PRODUCT_OUT_OF_STOCK_BUTTON_TITLE } from "../../../languages/ru/languages";
import Button from "../../Button";
import ImageSVG from "../../ImageSVG";
import ProductPrice from "../ProductPrice";
import { addToCartResolver } from "../../../graphql/vars/shoppingCartVar";
import { gql, useLazyQuery } from "@apollo/client";
import { GET_PRODUCT_PRICE } from "../../../graphql/queries/getProductPrice";
import { GET_PRODUCT_STOCK } from "../../../graphql/queries/getProductStock";

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
        query getProductPrice($wpWcProductId: Int!) {
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
            console.log(fetchedData.wpWcProduct.status)
            setIsOutOfStock(
                fetchedData.wpWcProduct.stock_status == 'instock' || fetchedData.wpWcProduct.stock_quantity > 0
                    ? false
                    : true
            );

            data.price = fetchedData.wpWcProduct.price;
            data.sale_price = fetchedData.wpWcProduct.sale_price;
        }
    }, [fetchedData]);

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