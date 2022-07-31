import * as React from "react"
import styled from "styled-components"
import { getHeightAttribute } from "../../../services/attributes";
import ImageSVG from "../../ImageSVG";

const StyledProductName = styled.div`
    display: flex;
    gap: 15px;
    justify-content: space-between;
`;

type ProductAttribute = {
    options: [string]
    name: string
}

type ProductNameProps = {
    name: string
    sku: string
    attributes: [ProductAttribute]
}

const ProductName = (props: ProductNameProps) => {

    const { name, sku, attributes } = props;

    const height = getHeightAttribute(attributes);

    return (
        <StyledProductName>
            <div>
                <h1>{name}</h1>
                <p>SKU: {sku}</p>
            </div>
            {height != undefined && <p><ImageSVG path='/svg/height.svg' height="100%" />{height.options[0]}</p>}
        </StyledProductName>
    )
}

export default ProductName;