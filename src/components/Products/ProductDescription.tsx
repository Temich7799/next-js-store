import React, { useContext } from "react"
import styled from "styled-components"
import { PRODUCT_DESCRIPTION_TITLE } from "../../languages/ru/languages";
import useMobile from "../../services/hooks/useMobile";
import CopyProtectedArea from "../CopyProtectedArea";
import { PageContext } from "./ProductPageContent";

const StyledProductDescription = styled.div<any>`
    max-width: ${props => props.maxWidth};
    min-width: 50%;
`;

const ProductDescription = () => {

    const { description }: string | any = useContext(PageContext);

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