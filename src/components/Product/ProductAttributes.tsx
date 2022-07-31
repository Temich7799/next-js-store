import * as React from "react"
import styled from "styled-components"
import { checkName, getName, makePath } from "../../services/attributes";
import ImageSVG from "../ImageSVG";

const StyledProductAttributes = styled.div`
    width: 100%;
    max-height: 280px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    margin: 2.5% 0;
    overflow-y: scroll;
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

    return (
        <StyledProductAttributes>
            <>
                {
                    data.map((attribute) =>
                        (checkName(attribute.name) && getName(attribute.name) != "height") &&
                        <ImageSVG path={makePath(attribute.name)} height="25px" width="45px" />
                    )
                }
            </>
        </StyledProductAttributes >
    )

}

export default ProductAttributes;