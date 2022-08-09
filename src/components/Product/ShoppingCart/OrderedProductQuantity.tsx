import React from "react"
import styled from "styled-components"
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
}
type Product = {
    product_id: number
    quantity: number
}

const OrderedProductQuantity = (props: OrderedProductQuantityProps) => {

    const { productId } = props;

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

    return (
        <StyledOrderedProductQuantity>
            <p>x {getProductQuantity(productId)}</p>
            <div>
                <Button id="orderedProductQuantityButton" buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        changeProductQuantity(productId, "increase");
                    }}>
                    <ImageSVG path='/svg/increase.svg' height="25px" width="25px" />
                </Button>
                <Button id="orderedProductQuantityButton" buttonSize="shrink" buttonStyle="transparent"
                    onClick={(e: any) => {
                        e.preventDefault();
                        if (getProductQuantity(productId) > 1) {
                            changeProductQuantity(productId, "decrease");
                        }
                    }}>
                    <ImageSVG path='/svg/decrease.svg' height="25px" width="25px" />
                </Button>
            </div>
            <Button id="orderedProductQuantityButton" buttonSize="shrink" buttonStyle="transparent"
                onClick={(e: any) => {
                    e.preventDefault();
                    removeProduct(productId);
                }}>
                <ImageSVG path='/svg/clear_cart.svg' height="25px" width="25px" />
            </Button>
        </StyledOrderedProductQuantity>
    )
}

export default OrderedProductQuantity;