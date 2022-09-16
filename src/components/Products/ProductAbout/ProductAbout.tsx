import React, { useContext } from "react"
import styled from "styled-components"
import { PageContext } from "../ProductPageContent";
import ProductAttributes from "./ProductAttributes";
import ProductBuy from "./ProductBuy";
import ProductDelivery from "./ProductDelivery";
import ProductName from "./ProductName";

type ProductAbout = {
    name: string
    sku: string
    slug: string
    attributes: [
        {
            options: [string]
            name: string
        }
    ]
}

const StyledProductAbout = styled.div`
    position: relative;
    width: fit-content;
    max-width: 450px;
    height: 400px;
`;

const ProductAbout = () => {

    const {
        name,
        sku,
        attributes,
    }: ProductAbout = useContext(PageContext);

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