import React, { useContext } from "react"
import styled from "styled-components"
import CopyProtectedWrapper from "../Wrappers/CopyProtectedWrapper";
import { ProductPageContext } from "../../templates/ProductPageTemplate";
import { PageContext } from "../../templates/BaseTemplate";

const StyledProductDescription = styled.div<any>`

    * {
        max-width: 75vw;
    }

    @media (max-width: ${props => props.minDesktopWidth}px) {
        width: 95vw;
    }
    padding: 50px 15% 0;
    width: 75vw;
`;

const ProductDescription = () => {

    const { description }: string | any = useContext(ProductPageContext);
    const { language } = useContext(PageContext);
    const { PRODUCT_DESCRIPTION_TITLE } = require(`../../languages/${language}/languages`);

    return (
        <StyledProductDescription minDesktopWidth={process.env.NEXT_PUBLIC_MIN_DESKTOP_WIDTH}>
            <CopyProtectedWrapper>
                <h3>{PRODUCT_DESCRIPTION_TITLE}</h3>
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </CopyProtectedWrapper>
        </StyledProductDescription>
    )
}

export default ProductDescription;