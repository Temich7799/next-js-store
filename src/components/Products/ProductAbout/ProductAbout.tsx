import React, { useContext } from "react"
import styled from "styled-components"
import { ProductGatsby } from "../../../types/InterfaceProduct";
import { ProductPageContext } from "../../Content/ProductPageContent";
import ProductAttributes from "./ProductAttributes";
import ProductBuy from "./ProductBuy";
import ProductDelivery from "./ProductDelivery";
import ProductName from "./ProductName";

const StyledProductAbout = styled.div`
    position: relative;
    width: fit-content;
    max-width: 450px;
    height: 400px;
`;

const ProductAbout = () => {

    const { name, sku, attributes }: ProductGatsby = useContext(ProductPageContext);

    return (
        <StyledProductAbout>
            <ProductName name={name} sku={sku} attributes={attributes} />
            {attributes.length ? <ProductAttributes data={attributes} /> : <></>}
            <ProductBuy />
            <ProductDelivery />
        </StyledProductAbout>
    )
}

export default ProductAbout;