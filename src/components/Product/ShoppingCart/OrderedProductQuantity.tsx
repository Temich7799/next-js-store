import React from "react"
import styled from "styled-components"
import { useDispatch } from 'react-redux'
import Button from "../../Button";
import ImageSVG from "../../ImageSVG";
import { addToShoppingCart, decreaseProductQuantity, removeFromShoopingCart, } from "../../../store/shoppingCartSlice";

const StyledOrderedProductQuantity = styled.div`
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;  
    gap: 5px;
`;

type Product = {
    data: {
        name: string
        sku: string
        price: string
        sale_price: string
        image: { src: string, alt: string }
        product_id: number
        quantity: number
    }
}

const OrderedProductQuantity = (props: Product) => {

    const { data } = props;

    const dispath = useDispatch();

    /*
        function changeProductQuantity(productId: number, direction: string) {
            const getProducts = localStorage.getItem('ordered_products');
            let products;
            if (getProducts) {
                products = JSON.parse(getProducts);
                products.forEach((product: Product) => {
                    if (product.product_id == productId) {
                        direction == "decrease" ? product.quantity-- : product.quantity++;
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
                    if (product.product_id == productId) {
                        products.splice(products.indexOf(product), 1);
                    }
                });
    
                localStorage.setItem('ordered_products', JSON.stringify(products))
            }
        }
    
        function getProductQuantity(productId: number): number {
    
            const products = localStorage.getItem('ordered_products');
            let quantity = 1;
    
            if (products) {
                JSON.parse(products).forEach((product: Product) => {
                    if (product.product_id == productId) {
                        quantity = product.quantity;
                    }
                });
            }
    
            return quantity;
        }
    */

    return (
        <StyledOrderedProductQuantity>
            <p>x {data.quantity}</p>
            <div>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        dispath(addToShoppingCart(data));
                    }}>
                    <ImageSVG path='/svg/increase.svg' height="25px" width="25px" />
                </Button>
                <Button buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        dispath(decreaseProductQuantity(data.product_id));
                    }}>
                    <ImageSVG path='/svg/decrease.svg' height="25px" width="25px" />
                </Button>
            </div>
            <Button buttonSize="shrink" buttonStyle="transparent"
                onClick={(e: any) => {
                    e.preventDefault();
                    dispath(removeFromShoopingCart(data.product_id))
                }}>
                <ImageSVG path='/svg/clear_cart.svg' height="25px" width="25px" />
            </Button>
        </StyledOrderedProductQuantity>
    )
}

export default OrderedProductQuantity;