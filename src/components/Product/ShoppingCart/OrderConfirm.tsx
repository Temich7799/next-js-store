import React from "react";
import styled from "styled-components"
import OrderDetails from "./OrderDetails";

const StyledOrderConfirm = styled.div`
    position: fixed;
    top: 0;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
`;

const OrderConfirm = () => {
    return (
        <StyledOrderConfirm>
            <OrderDetails />
        </StyledOrderConfirm>
    )
}

export default OrderConfirm;