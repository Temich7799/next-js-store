import React, { useContext } from "react"
import styled from "styled-components"
import ImageSVG from "../../ImageSVG";
import { useProductAttributes } from "../../../services/hooks/useProductAttributes";
import { PageContext } from "../../Layouts/Layout";

type ProductNameProps = {
    name: string
    sku: string
    attributes: [ProductAttribute]
}

type ProductAttribute = {
    options: [string]
    name: string
}

const StyledProductName = styled.div<any>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
        text-align: left;
        font-size: 28px;
        display: inline-block;
        margin: 2.5% 0;
    }
`;

const StyledHeightAttribute = styled.div`
    margin-bottom: 10%;
    min-width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        margin: 0;
    }
`;

const ProductName = (props: ProductNameProps) => {

    const { language } = useContext(PageContext);
    const { PRODUCT_SKU, PRODUCT_SKU_EMPTY } = require(`../../../languages/${language}/languages`);

    const { name, sku, attributes } = props;

    const { getHeightAttribute } = useProductAttributes();

    const heightAttribute: any = getHeightAttribute(attributes);

    return (
        <StyledProductName>
            <div>
                <h1>{name}</h1>
                <p>{PRODUCT_SKU}: {sku != '' ? sku : PRODUCT_SKU_EMPTY}</p>
            </div>
            {
                heightAttribute && heightAttribute.options[0] &&
                <StyledHeightAttribute >
                    <ImageSVG path='/svg/product/attributes/height.svg' height="75px" width="25px" />
                    <p>{heightAttribute.options[0]}</p>
                </StyledHeightAttribute>
            }
        </StyledProductName >
    )
}

export default ProductName;