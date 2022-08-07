import * as React from "react"
import styled from "styled-components"

const StyledShoppingCartForm = styled.form`
    /* other form styles are in <src/styles/wp.css> */

`;

const ShoppingCartForm = () => {
    return (
        <StyledShoppingCartForm id="shopping_cart_form">
            <label htmlFor="first_name">Name</label><input name="first_name" required />
            <label htmlFor="last_name">Last Name</label><input name="last_name" required />
            <label htmlFor="phone">Phone</label><input name="phone" required />
            <label htmlFor="city">City</label><input name="city" required />
            <label htmlFor="address_1">Adress</label><input name="address_1" required />
            <label htmlFor="postcode">Postcode</label><input name="postcode" />
        </StyledShoppingCartForm>
    )
}

export default ShoppingCartForm;