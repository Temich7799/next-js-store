import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { addToCart } from "../../../services/addToCart";
import Button from "../../Button";
import ImageSVG from "../../ImageSVG";

const StyledOrderedProductQuantity = styled.div`
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;  
    gap: 5px;
`;

type OrderedProductQuantityProps = {
    productId: number
    price: string
    salePrice: string
    calcTotalPrice?: Function
}
type Product = {
    product_id: string
    quantity: number
}

const OrderedProductQuantity = (props: OrderedProductQuantityProps) => {

    const { productId, calcTotalPrice, price, salePrice } = props;

    function increaseProductQuantity(productId: number): void { addToCart(productId) }

    function decreaseProductQuantity(productId: number): void {

        const getProducts = localStorage.getItem('ordered_products');
        let products;
        if (getProducts) {
            products = JSON.parse(getProducts);
            products.forEach((product: Product) => {
                if (product.product_id == productId.toString()) {
                    product.quantity--;
                }
            });
        }

        localStorage.setItem('ordered_products', JSON.stringify(products))
    }

    function removeProduct(productId: number): void {

        const getProducts = localStorage.getItem('ordered_products');

        if (getProducts) {

            const products = JSON.parse(getProducts);
            products.forEach((product: Product) => {
                if (product.product_id == productId.toString()) {
                    products.splice(products.indexOf(product), 1);
                }
            });

            localStorage.setItem('ordered_products', JSON.stringify(products))
        }
    }

    function getProductQuantity(productId: number): number {

        const products = localStorage.getItem('ordered_products');
        let quantity = 0;

        if (products) {
            JSON.parse(products).forEach((product: Product) => {
                if (product.product_id == productId.toString()) {
                    quantity = product.quantity;
                }
            });
        }

        return quantity;
    }

    const [productQuantity, setProductQuantity] = useState(0);
    useEffect(() => setProductQuantity(getProductQuantity(productId)), []);

    return (
        <StyledOrderedProductQuantity>
            <p>x {productQuantity}</p>
            <div>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault(); increaseProductQuantity(productId);
                        setProductQuantity(getProductQuantity(productId));
                        calcTotalPrice && calcTotalPrice(parseInt(price));
                    }}>
                    <ImageSVG path='/svg/increase.svg' height="25px" width="25px" />
                </Button>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault(); if (productQuantity > 1) {
                            decreaseProductQuantity(productId);
                            setProductQuantity(getProductQuantity(productId));
                            calcTotalPrice && calcTotalPrice(-parseInt(price));
                        }
                    }}>
                    <ImageSVG path='/svg/decrease.svg' height="25px" width="25px" />
                </Button>
            </div>
            <Button buttonSize="shrink" buttonStyle="transparent" onClick={(e: any) => { e.preventDefault(); removeProduct(productId) }}>
                <ImageSVG path='/svg/clear_cart.svg' height="25px" width="25px" />
            </Button>
        </StyledOrderedProductQuantity>
    )
}

export default OrderedProductQuantity;