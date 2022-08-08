import React, { useEffect, useState } from "react"
import sendOrder from "../../../services/sendOrder";
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby";

const StyledShoppingCartForm = styled.form`
    /* other form styles are in <src/styles/wp.css> */

`;

const ShoppingCartForm = () => {

    const shippingZonesMethods = useStaticQuery(
        graphql`
            query getAllShippingZonesMethods {
                allWcShippingZones3Methods(filter: {enabled: {eq: true}}) {
                    edges {
                        node {
                            instance_id
                            method_id
                            method_title
                            method_description
                        }
                    }
                }
            }
        `
    );

    const [shippingZoneMethod, setShippingZoneMethod] = useState<Response | object>();

    useEffect(() => console.log(shippingZoneMethod), [shippingZoneMethod]);

    function selectOnChangeHandler(event: any) {
        event.target.value &&
            fetch(`http://localhost:3000/shipping_line?shippingZoneMethod=${event.target.value}`, { mode: 'cors', })
                .then(responce => responce && responce.json()).then(data => setShippingZoneMethod(data))
    }

    return (
        <StyledShoppingCartForm id="shopping_cart_form" onSubmit={(e: any) => { e.preventDefault(); sendOrder() }}>
            <label htmlFor="first_name">Name</label><input name="first_name" required />
            <label htmlFor="last_name">Last Name</label><input name="last_name" required />
            <label htmlFor="phone">Phone</label><input name="phone" required />
            <label htmlFor="shipping_lines">Delivery</label>
            <select name="shipping_lines" onChange={(e: any) => selectOnChangeHandler(e)} required>
                {!shippingZoneMethod && <option>Not selected</option>}
                {shippingZonesMethods.allWcShippingZones3Methods.edges.map((method: any) =>
                    <option value={method.node.method_id}>{method.node.method_title}</option>)}
            </select>
            <label htmlFor="city">City</label><input name="city" required />
            <label htmlFor="address_1">Adress</label><input name="address_1" required />
            <label htmlFor="postcode">Postcode</label><input name="postcode" />
        </StyledShoppingCartForm >
    )
}

export default ShoppingCartForm;