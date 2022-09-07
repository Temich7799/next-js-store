import * as React from "react"
import styled from "styled-components"
import { PRODUCT_DESCRIPTION_TITLE } from "../../languages/ru/languages";
import useMobile from "../../services/hooks/useMobile";
import NotCopyArea from "../NotCopyArea";

const StyledProductDescription = styled.div<any>`
    max-width: ${props => props.maxWidth};
`;

type ProductDescriptionProps = {
    data: string
}

const ProductDescription = (props: ProductDescriptionProps) => {

    const { data } = props;

    const isMobile = useMobile();

    return (
        <StyledProductDescription maxWidth={isMobile ? '95%' : '55%'}>
            <NotCopyArea>
                <h3>{PRODUCT_DESCRIPTION_TITLE}</h3>
                <p dangerouslySetInnerHTML={{ __html: data }} />
            </NotCopyArea>
        </StyledProductDescription>
    )
}

export default ProductDescription;