import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import ProductPrice from "../ProductPrice";
import { useShoppingCartVar } from "../../../services/hooks/apollo_vars/useShoppingCartVar";
import { ProductPageContext } from "../../../templates/ProductPageTemplate";
import ProductBuyButton from "../../Buttons/ProductBuyButton";
import PurchasedProductQuantity from "../../ShoppingCart/OrderDetails/PurchasedProductQuantity";
import GoToCartButton from "../../Buttons/GoToCartButton";
import { Product } from "../../../interfaces/InterfaceProduct";
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

    const data: Product = useContext(ProductPageContext);

    const isOutOfStock = data.stock_quantity > 0 || data.stock_status === 'instock' ? false : true;

    const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

    const { add: addToCart, isInTheCart } = useShoppingCartVar();

    const { save: saveLastProductPage } = useLastProductPageVar();

    function buttonOnClickHandler() {
        addToCart(data.id, data);
        saveLastProductPage();
        setShowPopUpWindow(true);
    }

    const { add: addToLastSeen } = useLastSeenProductsVar();
    useEffect(() => {
        addToLastSeen(data.id, data);
    }, []);

    return (
        <StyledProductBuy minDesktopWidth={process.env.NEXT_PUBLIC_MIN_DESKTOP_WIDTH}>
            <ProductPrice price={data.price} salePrice={data.sale_price} />
            {
                isInTheCart(data.id)
                    ?
                    <StyledProductBuy>
                        <GoToCartButton isButtonDisabled={isOutOfStock} />
                        <PurchasedProductQuantity data={data} />
                    </StyledProductBuy>
                    : <ProductBuyButton onClickHandler={buttonOnClickHandler} isOutOfStock={isOutOfStock} />
            }
            <PopUpWindow visible={showPopUpWindow} setVisible={setShowPopUpWindow} >
                <OrderDetails />
            </PopUpWindow>
        </StyledProductBuy >
    )
}

export default ProductBuy;