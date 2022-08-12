import React from "react"
import sendOrder from "../../../../services/sendOrder";
import styled from "styled-components"
import Delivery from "./Delivery/Delivery";
import ClientContacts from "./ClientContacts";

const StyledShoppingCartForm = styled.form`
    /* other form styles are in <src/styles/wp.css> */

`;

const ShoppingCartForm = () => {

    return (
        <StyledShoppingCartForm id="shopping_cart_form" onSubmit={(e: any) => { e.preventDefault(); sendOrder() }}>
            <ClientContacts />
            <Delivery />
        </StyledShoppingCartForm >
    )
}

export default ShoppingCartForm;