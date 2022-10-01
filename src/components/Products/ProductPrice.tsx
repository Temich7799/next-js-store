import * as React from "react"
import styled from "styled-components"
import { PRODUCT_PRICE_TITLE } from "../../languages/ru/languages";
import LoadingSpinner from "../LoadingBars/LoadingSpinner";

type ProductPriceProps = {
    price: string
    salePrice: string
    isPriceLoading?: boolean
    showTitle?: boolean
}

const StyledProductPrice = styled.div<any>`
    max-width: 125px;
    ${props => props.showTitle && `
       display: flex;
        align-items: center;
        gap: 5px;
        flex-wrap: wrap; 
    `} 
    p {
        margin: 0;
    }
`;

const OldPrice = styled.s`
    color: #8a8a8a;
    font-size: smaller;
`;

const SalePrice = styled.span`
    color: #da4b4b;
    font-size: larger;
    font-weight: bolder;
`;

const ProductPrice = (props: ProductPriceProps) => {

    let { price, salePrice, isPriceLoading = false, showTitle = true } = props;

    return (
        <StyledProductPrice showTitle={showTitle}>
            {
                showTitle && <p>{`${PRODUCT_PRICE_TITLE}:`}</p>
            }
            {
                isPriceLoading
                    ? <LoadingSpinner size="15%" />
                    :
                    <>
                        {
                            salePrice.length > 0
                                ? <p><OldPrice>{price}{" "}</OldPrice><SalePrice>{" "}{salePrice}</SalePrice> грн</p>
                                : <p>{price} грн</p>
                        }
                    </>
            }
        </StyledProductPrice>
    )
}

export default ProductPrice;