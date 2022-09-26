import * as React from "react"
import styled from "styled-components"
import { useProductAttributes } from "../../../services/hooks/useProductAttributes";
import ImageSVG from "../../ImageSVG";

const StyledProductAttributes = styled.div`
    width: 100%;
    max-height: 280px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 15px;
    margin: 15px 0;
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

    const { checkName, getName: parseAttributeName, makePath: makePathToSVG } = useProductAttributes();

    return (
        <StyledProductAttributes>
            {
                data.map((attribute, index) =>
                    (checkName(attribute.name) && parseAttributeName(attribute.name) != "height") &&
                    <ImageSVG path={makePathToSVG(attribute.name)} height="25px" width="45px" key={index} />
                )
            }
        </StyledProductAttributes >
    )

}

export default ProductAttributes;