import React, { useContext } from "react"
import styled from "styled-components"
import ProductPrice from "../ProductPrice";
import { useShoppingCartVar } from "../../../services/hooks/apollo/useShoppingCartVar";
import useUpdatedProduct from "../../../services/hooks/useUpdatedProduct";
import { PageContext } from "../../Content/ProductPageContent";
import ProductBuyButton from "../../Buttons/ProductBuyButton";
import PurchasedProductQuantity from "../ShoppingCart/OrderDetails/PurchasedProductQuantity";
import GoToCartButton from "../../Buttons/GoToCartButton";

const StyledProductBuy = styled.div`
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin: 10px 0;
`;

type ProductBuy = {
    name: string
    slug: string
    sku: string
    image: {
        alt: string
        src: string
    }
    wordpress_id: number
}

type FetchedData = {
    name: string
    slug: string
    sku: string
    wordpress_id: number
    price: string
    stock_status: string
    stock_quantity: number | null
    sale_price: string
    image: {
        alt: string
        src: string
    }
}

const ProductBuy = () => {

    const data: ProductBuy = useContext(PageContext);

    const { loading: isDataLoading, updatedData, isOutOfStock } = useUpdatedProduct(data);

    const { add, isInTheCart } = useShoppingCartVar();

    function buttonOnClickHandler() {
        add(data.wordpress_id, updatedData);
    }

    return (
        <StyledProductBuy>
            <ProductPrice price={updatedData.price} salePrice={updatedData.sale_price} isPriceLoading={isDataLoading} />
            {
                isInTheCart(data.wordpress_id)
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