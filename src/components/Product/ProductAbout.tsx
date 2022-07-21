import * as React from "react"
import styled from "styled-components"
import Button from "../Button";

const StyledProductAbout = styled.div`
    width: fit-content;
    height: 400px;
`;

const ProductName = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const ProductBuy = styled.div`
    display: flex;
    justify-content: space-between;
`;

type ProductAboutProps = {
    data: {
        price: string
        name: string
        sku: string
    }
}

const ProductAbout = (props: ProductAboutProps) => {

    const { data } = props;

    return (
        <StyledProductAbout>
            <ProductName>
                <h1>{data.name}</h1>
                <p>SKU: {data.sku}</p>
            </ProductName>
            <ProductBuy>
                <p>Price: <b>{data.price}</b></p>
                <Button>Buy</Button>
            </ProductBuy>
        </StyledProductAbout>
    )
}

export default ProductAbout;