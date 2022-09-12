import * as React from "react"
import styled from "styled-components"
import ProductAttributes from "./ProductAttributes";
import ProductBuy from "./ProductBuy";
import ProductDelivery from "./ProductDelivery";
import ProductName from "./ProductName";

type ProductAboutProps = {
    data: {
        name: string
        sku: string
        price: string
        sale_price: string
        stock_quantity: number | null
        attributes: [
            {
                options: [string]
                name: string
            }
        ]
        slug: string
        images: [{
            src: string
            alt: string
            localFile: object
        }]
        wordpress_id: number
        quantity: number
    }
}

const StyledProductAbout = styled.div`
    position: relative;
    width: fit-content;
    max-width: 450px;
    height: 400px;
`;

const ProductAbout = (props: ProductAboutProps) => {

    const { data } = props;

    return (
        <StyledProductAbout>
            <ProductName name={data.name} sku={data.sku} attributes={data.attributes} />
            {data.attributes.length ? <ProductAttributes data={data.attributes} /> : <></>}
            <ProductBuy data={data} />
            <ProductDelivery />
        </StyledProductAbout>
    )
}

export default ProductAbout;