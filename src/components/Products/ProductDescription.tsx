import React, { useContext } from "react"
import styled from "styled-components"
import useMobile from "../../services/hooks/useMobile";
import CopyProtectedArea from "../CopyProtectedArea";
import { PageContext } from "../Content/ProductPageContent";
import { LangContext } from "../Layouts/Layout";

const StyledProductDescription = styled.div<any>`
    max-width: ${props => props.maxWidth};
    min-width: 50%;
`;

const ProductDescription = () => {

    const { description }: string | any = useContext(PageContext);
    const { language } = useContext(LangContext);
    const { PRODUCT_DESCRIPTION_TITLE } = require(`../../languages/${language}/languages`);

    const isMobile = useMobile();

    return (
        <StyledProductDescription maxWidth={isMobile ? '95%' : '55%'}>
            <CopyProtectedArea>
                <h3>{PRODUCT_DESCRIPTION_TITLE}</h3>
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </CopyProtectedArea>
        </StyledProductDescription>
    )
}

export default ProductDescription;