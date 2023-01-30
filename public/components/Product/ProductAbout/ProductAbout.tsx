import React, { useContext } from "react"
import styled from "styled-components"
import { wpProduct } from "../../../interfaces/InterfaceProduct";
import { ProductPageContext } from "../../../templates/ProductPageTemplate";
import ProductAttributes from "./ProductAttributes";
import ProductBuy from "./ProductBuy";
import ProductDelivery from "./ProductDelivery";
import ProductName from "./ProductName";

const StyledProductAbout = styled.div`
    position: relative;
    width: fit-content;
    max-width: 525px;
    max-height: 400px;
`;

const ProductAbout = () => {

    const { name, sku, attributes }: wpProduct | any = useContext(ProductPageContext);

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