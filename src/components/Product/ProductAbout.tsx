import * as React from "react"
import styled from "styled-components"
import getHeightAttribute from "../../services/getHeightAttribute";
import Button from "../Button";
import ProductAttribute from "./ProductAttribute";
import ProductAttributes from "./ProductAttributes";

const StyledProductAbout = styled.div`
    width: fit-content;
    max-width: 450px;
    height: 400px;
`;

const StyledProductAttributes = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ProductName = styled.div`

`;

const ProductBuy = styled.div`
    display: flex;
    justify-content: space-between;
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

    const height = getHeightAttribute(data.attributes);

    return (
        <StyledProductAbout>
            <ProductName>
                <h1>{data.name}</h1>
                <p>SKU: {data.sku}</p>
            </ProductName>
            {
                data.attributes.length &&
                <StyledProductAttributes>
                    <>
                        <ProductAttributes data={data.attributes} />
                        {height && <p><ProductAttribute svgPath='/svg/height.svg' />{height.options[0]}</p>}
                    </>
                </StyledProductAttributes>

            }
            <ProductBuy>
                <p>Price: <b>{data.price}</b></p>
                <Button>Buy</Button>
            </ProductBuy>
        </StyledProductAbout>
    )
}

export default ProductAbout;