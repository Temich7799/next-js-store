import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import ProductPrice from "../ProductPrice";
import { useShoppingCartVar } from "../../../services/hooks/apollo_vars/useShoppingCartVar";
import useUpdatedProduct from "../../../services/hooks/useUpdatedProduct";
import { ProductPageContext } from "../../../templates/ProductPageTemplate";
import ProductBuyButton from "../../Buttons/ProductBuyButton";
import PurchasedProductQuantity from "../../ShoppingCart/OrderDetails/PurchasedProductQuantity";
import GoToCartButton from "../../Buttons/GoToCartButton";
import { wpProduct } from "../../../interfaces/InterfaceProduct";
import PopUpWindow from "../../PopUp/PopUpWindow";
import OrderDetails from "../../ShoppingCart/OrderDetails/OrderDetails";
import { useLastProductPageVar } from "../../../services/hooks/apollo_vars/useLastProductPageVar";
import { useLastSeenProductsVar } from "../../../services/hooks/apollo_vars/useLastSeenProductsVar";

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

    const data: wpProduct | any = useContext(ProductPageContext);

    const { loading: isDataLoading, data: updatedData, isOutOfStock } = useUpdatedProduct(data);

    const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

    const { add: addToCart, isInTheCart } = useShoppingCartVar();

    const { save: saveLastProductPage } = useLastProductPageVar();

    function buttonOnClickHandler() {
        updatedData && addToCart(data.id, updatedData);
        saveLastProductPage();
        setShowPopUpWindow(true);
    }

    const { add: addToLastSeen } = useLastSeenProductsVar();
    useEffect(() => {
        updatedData && addToLastSeen(data.id, updatedData);
    }, [updatedData]);

    return (
        <StyledProductBuy minDesktopWidth={process.env.NEXT_PUBLIC_MIN_DESKTOP_WIDTH}>
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
            <PopUpWindow visible={showPopUpWindow} setVisible={setShowPopUpWindow} >
                <OrderDetails />
            </PopUpWindow>
        </StyledProductBuy >
    )
}

export default ProductBuy;