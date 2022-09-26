import React from "react"
import styled from "styled-components"
import ImageSVG from "../../ImageSVG";
import CopyArea from "../../CopyArea";
import { PRODUCT_SKU, PRODUCT_SKU_EMPTY } from "../../../languages/ru/languages";
import { useProductAttributes } from "../../../services/hooks/useProductAttributes";

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
    gap: 15px;
    justify-content: space-between;
    h1, p {
        display: inline-block;
        margin: 2.5% 0;
    }
`;

const ProductName = (props: ProductNameProps) => {

    const { name, sku, attributes } = props;

    const { getHeightAttribute } = useProductAttributes();

    const height = getHeightAttribute(attributes);

    return (
        <StyledProductName>
            <div>
                <CopyArea><h1>{name}</h1></CopyArea>
                <CopyArea><p>{PRODUCT_SKU}: {sku != '' ? sku : PRODUCT_SKU_EMPTY}</p></CopyArea>
            </div>
            {
                height != undefined &&
                <p>
                    <ImageSVG path='/svg/height.svg' height="100%" />
                    {height.options[0]}
                </p>
            }
        </StyledProductName>
    )
}

export default ProductName;