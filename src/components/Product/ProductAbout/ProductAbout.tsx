import * as React from "react"
import styled from "styled-components"
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

type ProductAttribute = {
    options: [string]
    name: string
}

type ProductAboutProps = {
    data: {
        price: string
        name: string
        sku: string
        attributes: [ProductAttribute]
    }
}

const ProductAbout = (props: ProductAboutProps) => {

    const { data } = props;

    return (
        <StyledProductAbout>
            <ProductName name={data.name} sku={data.sku} attributes={data.attributes} />
            {data.attributes.length && <ProductAttributes data={data.attributes} />}
            <ProductBuy price={data.price} />
            <ProductDelivery />
        </StyledProductAbout>
    )
}

export default ProductAbout;