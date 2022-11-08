import React, { useContext } from "react"
import styled from "styled-components"
import ProductPrice from "../ProductPrice";
import { useShoppingCartVar } from "../../../services/hooks/apollo_vars/useShoppingCartVar";
import useUpdatedProduct from "../../../services/hooks/useUpdatedProduct";
import { ProductPageContext } from "../../Content/ProductPageContent";
import ProductBuyButton from "../../Buttons/ProductBuyButton";
import PurchasedProductQuantity from "../ShoppingCart/OrderDetails/PurchasedProductQuantity";
import GoToCartButton from "../../Buttons/GoToCartButton";
import { ProductGatsby } from "../../../interfaces/InterfaceProduct";

const StyledProductBuy = styled.div<any>`
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 15px auto;
    column-gap: 15px;

    @media (min-width: ${props => props.minDesktopWidth}px) {
        column-gap: 50px;
        margin: 25px 0;
  }
`;

const ProductBuy = () => {

    const data: ProductGatsby = useContext(ProductPageContext);

    const { loading: isDataLoading, data: updatedData, isOutOfStock } = useUpdatedProduct(data);

    const { add, isInTheCart } = useShoppingCartVar();

    function buttonOnClickHandler() {
        updatedData && add(data.id, updatedData);
    }

    return (
        <StyledProductBuy minDesktopWidth={process.env.GATSBY_MIN_DESKTOP_WIDTH}>
            <ProductPrice price={updatedData && updatedData.price} salePrice={updatedData && updatedData.sale_price} isPriceLoading={isDataLoading} />
            {
                isInTheCart(data.id)
                    ?
                    <StyledProductBuy>
                        <GoToCartButton isButtonDisabled={isDataLoading || isOutOfStock} />
                        <PurchasedProductQuantity data={updatedData} />
                    </StyledProductBuy>
                    : <ProductBuyButton onClickHandler={buttonOnClickHandler} isDataLoading={isDataLoading} isOutOfStock={isOutOfStock} />
            }
        </StyledProductBuy >
    )
}

export default ProductBuy;