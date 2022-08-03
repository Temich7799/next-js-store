import * as React from "react"
import styled from "styled-components"

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

    const { price, salePrice } = props;

    return (
        <p>
            <>
                Price:{" "}
                {
                    salePrice.length
                        ? <><OldPrice>{price}{" "}</OldPrice><SalePrice>{" "}{salePrice}</SalePrice> грн</>
                        : price
                }
            </>
        </p>
    )
}

export default ProductPrice;