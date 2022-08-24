import { Link } from "gatsby";
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import sendOrder from "../../../services/sendOrder";
import Button from "../../Button";
import OrderedProducts from "./OrderedProducts";

const StyledOrderDetails = styled.form`
    /* other form styles are in <src/styles/wp.css> */
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    background-color: #fefefe;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    h1 {
        font-size: smaller;
    }
     h4 {
        margin: 0;
        text-align: center;
    }
`;

const OrderFinal = styled.div`
    p {
        margin: 10px 0;
        text-align: center;
        font-size: 20px;
    }
    div{  
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
    }
`;

type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    image: { src: string, alt: string },
    product_id: number
    quantity: number
}

type Products = [Product];

const OrderDetails = () => {

    const [isFinalStep, setIsFinalStep] = useState<boolean>(false);
    const [products, setProducts] = useState<Products | undefined>();
    useEffect(() => {
        const form = document.getElementById("shopping_cart_form");

        if (form) {
            setIsFinalStep(true);
            form.addEventListener('submit', (e: any) => formOnSubmitHandler(e))
        }

        setProducts(getProducts());
        window.addEventListener('click', (e: MouseEvent) => buttonOnClickHandler(e))
    }, []);

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    useEffect(() => products && setIsButtonDisabled(products.length ? false : true), [products]);

    function buttonOnClickHandler(onClickEvent: any) { onClickEvent.target.closest('#shoppingCartButton') && setProducts(getProducts()) }

    function getProducts(): Products {
        let products;
        const getProducts = localStorage.getItem('ordered_products');
        if (getProducts) products = JSON.parse(getProducts);
        return products;
    }

    function calcTotalPrice(products: Products | undefined): number {
        let price = 0;
        products && products.forEach((product: Product) =>
            price = (parseInt(product.sale_price ? product.sale_price : product.price) + price) * product.quantity);
        return price;
    }

    function formOnSubmitHandler(onSubmitEvent: any) {
        onSubmitEvent.preventDefault();
        sendOrder();
    }

    return (
        <StyledOrderDetails id="order_details">
            <h4>Your Order</h4>
            <OrderedProducts data={products} />
            <OrderFinal>
                <h4>Total </h4>
                <p>{calcTotalPrice(products)} $</p>
                <div>
                    <Button onClick={(e: any) => e.preventDefault()}>Back to Shop</Button>
                    {
                        isFinalStep
                            ? <Button type="submit" form="shopping_cart_form" disabled={isButtonDisabled} buttonStyle="accent">{isButtonDisabled ? "No Products" : "Make an Order"}</Button>
                            : isButtonDisabled
                                ? <Button buttonStyle="accent" disabled={isButtonDisabled} >No selected Products</Button>
                                : <Link to="/shopping_cart"><Button buttonStyle="accent" disabled={isButtonDisabled} >Go to Shopping cart</Button></Link>
                    }
                </div>
            </OrderFinal>
        </StyledOrderDetails >
    )
}

export default OrderDetails;
