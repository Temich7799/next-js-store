import React, { useContext } from "react"
import styled from "styled-components"
import ImageSVG from "../../ImageSVG";
import CopyArea from "../../CopyArea";
import { useProductAttributes } from "../../../services/hooks/useProductAttributes";
import { LangContext } from "../../Layouts/Layout";

type ProductNameProps = {
    name: string
    sku: string
    attributes: [ProductAttribute]
}

type ProductAttribute = {
    options: [string]
    name: string
}

const StyledProductName = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    h1 {
        display: inline-block;
        margin: 2.5% 0;
    }
`;

const StyledHeightAttribute = styled.div`
    min-width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        margin: 0;
    }
`;

const ProductName = (props: ProductNameProps) => {

    const { language } = useContext(LangContext);
    const { PRODUCT_SKU, PRODUCT_SKU_EMPTY } = require(`../../../languages/${language}/languages`);

    const { name, sku, attributes } = props;

    const { getHeightAttribute } = useProductAttributes();

    const height = getHeightAttribute(attributes);

    return (
        <StyledProductName>
            <div>
                <h1>{name}</h1>
                <p>{PRODUCT_SKU}: {sku != '' ? sku : PRODUCT_SKU_EMPTY}</p>
            </div>
            {
                height !== undefined &&
                <StyledHeightAttribute>
                    <ImageSVG path='/svg/height.svg' height="75px" width="25px" />
                    <p>{height.options[0]}</p>
                </StyledHeightAttribute>
            }
        </StyledProductName>
    )
}

export default ProductName;