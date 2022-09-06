import * as React from "react"
import styled from "styled-components"
import { PRODUCT_PRICE_TITLE } from "../../languages/ru/languages";
import LoadingBar from "../LoadingBar";

const StyledProductPrice = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
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

type PriceProps = {
    price: string
    salePrice: string
}

const ProductPrice = (props: PriceProps) => {

    let { price, salePrice } = props;

    return (
        <StyledProductPrice>
            <p>{`${PRODUCT_PRICE_TITLE}:`}</p>
            {
                (price === undefined && salePrice === undefined)
                    ? <LoadingBar size="15%" />
                    :
                    <>
                        {
                            salePrice.length > 0
                                ? <p><OldPrice>{price}{" "}</OldPrice><SalePrice>{" "}{salePrice}</SalePrice> грн</p>
                                : <p>{price}</p>
                        }
                    </>
            }
        </StyledProductPrice>
    )
}

export default ProductPrice;