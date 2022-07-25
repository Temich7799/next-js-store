import * as React from "react"
import styled from "styled-components"
import { getHeightAttribute } from "../../services/attributes";
import Button from "../Button";
import ProductAttribute from "./ProductAttribute";
import ProductAttributes from "./ProductAttributes";

const StyledProductAbout = styled.div`
    position: relative;
    width: fit-content;
    max-width: 450px;
    height: 400px;
`;

const ProductName = styled.div`
    display: flex;
    gap:15px;
    justify-content: space-between;
`;

const ProductBuy = styled.div`
    display: flex;
    justify-content: center;
    gap:15px;
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
                <>
                    <div>
                        <h1>{data.name}</h1>
                        <p>SKU: {data.sku}</p>
                    </div>
                    {height != undefined && <p><ProductAttribute svgPath='/svg/height.svg' />{height.options[0]}</p>}
                </>
            </ProductName>
            {
                data.attributes.length &&
                <ProductAttributes data={data.attributes} />

            }
            <ProductBuy>
                <p>Price: <b>{data.price}</b></p>
                <Button>Buy</Button>
            </ProductBuy>
        </StyledProductAbout>
    )
}

export default ProductAbout;