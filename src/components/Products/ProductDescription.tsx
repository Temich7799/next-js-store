import React, { useContext } from "react"
import styled from "styled-components"
import CopyProtectedArea from "../CopyProtectedArea";
import { PageContext } from "../Content/ProductPageContent";
import { LangContext } from "../Layouts/Layout";

const StyledProductDescription = styled.div<any>`

    @media (max-width: ${props => props.minDesktopWidth}px) {
        max-width: 95%;
    }

    max-width: 55%;
    min-width: 50%;
`;

const ProductDescription = () => {

    const { description }: string | any = useContext(PageContext);
    const { language } = useContext(LangContext);
    const { PRODUCT_DESCRIPTION_TITLE } = require(`../../languages/${language}/languages`);

    return (
        <StyledProductDescription minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
            <CopyProtectedArea>
                <h3>{PRODUCT_DESCRIPTION_TITLE}</h3>
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </CopyProtectedArea>
        </StyledProductDescription>
    )
}

export default ProductDescription;