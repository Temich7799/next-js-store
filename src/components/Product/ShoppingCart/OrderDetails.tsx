import { Link } from "gatsby";
import React, { forwardRef, useEffect, useState } from "react"
import styled from "styled-components"
import { useSelector } from 'react-redux'
import { ORDER_DETAILS_TITLE, ORDER_FINAL_BUTTON_BACK, ORDER_FINAL_BUTTON_CONTINUE, ORDER_FINAL_TITLE, ORDER_FINAL_BUTTON_SUBMIT, ORDER_FINAL_BUTTON_DISABLED } from "../../../languages/ru/languages";
import Button from "../../Button";
import LoadingBar from "../../LoadingBar";
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
    wordpress_id: number
    quantity: number
}

const OrderDetails = forwardRef((props: any, formRef: any) => {

    const { isFetchPending } = props;

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const shoppingCartProducts: Array<Product> = Object.values(useSelector((state: { shoppingCart: object }) => state.shoppingCart));

    useEffect(() => {
        shoppingCartProducts && setIsButtonDisabled(shoppingCartProducts.length ? false : true);
        setTotalPrice(calcTotalPrice(shoppingCartProducts));
    }, [shoppingCartProducts]);

    function calcTotalPrice(shoppingCartProducts: any): number {
        let price = 0;
        shoppingCartProducts && shoppingCartProducts.forEach((product: Product) =>
            price += (parseInt(product.sale_price ? product.sale_price : product.price)) * product.quantity);
        return price;
    }

    return (
        <StyledOrderDetails id="order_details">
            <h4>{ORDER_DETAILS_TITLE}</h4>
            <OrderedProducts data={shoppingCartProducts} />
            <OrderFinal>
                <h4>{ORDER_FINAL_TITLE} </h4>
                <p>{totalPrice} $</p>
                <div>
                    <Button onClick={(e: any) => e.preventDefault()}>{ORDER_FINAL_BUTTON_BACK}</Button>
                    {
                        formRef
                            ? <Button type="submit" form="order_form" disabled={isButtonDisabled || isFetchPending} buttonStyle="accent">{!isFetchPending ? isButtonDisabled ? ORDER_FINAL_BUTTON_DISABLED : ORDER_FINAL_BUTTON_SUBMIT : <LoadingBar />}</Button>
                            : isButtonDisabled
                                ? <Button buttonStyle="accent" disabled={isButtonDisabled}>{ORDER_FINAL_BUTTON_DISABLED}</Button>
                                : <Link to="/shopping_cart"><Button buttonStyle="accent" disabled={isButtonDisabled}>{ORDER_FINAL_BUTTON_CONTINUE}</Button></Link>
                    }
                </div>
            </OrderFinal>
        </StyledOrderDetails >
    )
})

export default OrderDetails;
