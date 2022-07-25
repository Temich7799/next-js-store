import * as React from "react"
import styled from "styled-components"
import ProductAttribute from "./ProductAttribute";

const StyledProductAttributes = styled.div`
    width: 100%;
    height: 12%;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin: 2.5% 0;
`;

type ProductAttributesProps = {
    data: [
        {
            options: [string]
            name: string
        }
    ]
}

const ProductAttributes = (props: ProductAttributesProps) => {

    const { data } = props;

    function getName(attributeName: string): string {
        return attributeName.split('/')[1].toLowerCase();
    }

    function checkName(attributeName: string): boolean {
        return (attributeName.indexOf('/') == -1) ? false : true
    }

    function makePath(attributeName: string): string {
        return `/svg/${getName(attributeName)}.svg`
    }

    return (
        <StyledProductAttributes>
            <>
                {
                    data.map((attribute) =>
                        (checkName(attribute.name) && getName(attribute.name) != "height") &&
                        <ProductAttribute svgPath={makePath(attribute.name)} />
                    )
                }
            </>
        </StyledProductAttributes >
    )

}

export default ProductAttributes;