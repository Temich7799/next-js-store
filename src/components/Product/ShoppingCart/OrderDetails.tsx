import React, { useState } from "react"
import { Link } from "gatsby";
import styled from "styled-components"
import Button from "../../Button";
import OrderedProducts from "./OrderedProducts";

const StyledOrderDetails = styled.form`
    /* other form styles are in <src/styles/wp.css> */
    width: 100%;
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
        gap: 15px;
    }
`;

const OrderDetails = () => {

    const [totalPrice, setTotalPrice] = useState(0);

    function calcTotalPrice(price: number) {
        setTotalPrice(price + totalPrice);
    }

    return ( 
        <StyledOrderDetails id="order_details">
            <h4>Your Order</h4>
            <OrderedProducts calcTotalPrice={calcTotalPrice} />
            <OrderFinal>
                <h4>Total </h4>
                <p>{totalPrice} $</p>
                <div>
                    <Button onClick={(e: any) => e.preventDefault()}>Back to Shop</Button>
                    <Link to="/shopping_cart"><Button buttonStyle="accent">Make an Order</Button></Link>
                </div>
            </OrderFinal>
        </StyledOrderDetails>
    )
}

export default OrderDetails;
