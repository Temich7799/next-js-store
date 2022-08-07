import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ProductName from "../ProductAbout/ProductName";
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
    grid-template-columns: 65px 1fr 1fr 1fr; 
    justify-content: space-around;
    align-items: center;
    gap: 10px;
`;

const OrderedProductThumb = styled.img`
    width: 65px;
    height: 65px;
    object-fit: cover;
`;

type FetchedProduct = {
    price: string
    sale_price: string
    name: string
    sku: string
    id: number
    images: [{
        src: string
        alt: string
    }]
}

type OrderedProductsProps = {
    calcTotalPrice?: Function
}

const OrderedProducts = (props: OrderedProductsProps) => {

    const { calcTotalPrice } = props;

    const [fetchData, setFetchData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000').then(async (response) => {
            setFetchData(await response.json());
        })
    }, []);

    useEffect(() => {

        function calcTotalPriceFromFetch() {
            let total = 0;
            fetchData.forEach((product: any) => total = parseInt(product.price) + total);
            return total;
        }

        calcTotalPrice && calcTotalPrice(calcTotalPriceFromFetch());

    }, [fetchData]);

    return (
        <StyledOrderedProducts id="ordered_products">
            <hr />
            {
                fetchData.map((product: FetchedProduct) =>
                    <OrderedProductDetails>
                        <OrderedProductThumb src={product.images[0].src} alt={product.images[0].alt} />
                        <ProductPrice price={product.price} salePrice={product.sale_price} />
                        <ProductName name={product.name} sku={product.sku} attributes={[{ options: [""], name: "string" }]} />
                        <OrderedProductQuantity calcTotalPrice={calcTotalPrice} price={product.price} salePrice={product.sale_price} productId={product.id} />
                    </OrderedProductDetails>
                )
            }
            <hr />
        </StyledOrderedProducts>
    )
}

export default OrderedProducts;
