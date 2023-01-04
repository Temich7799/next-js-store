import React, { useContext, useState } from "react"
import styled from "styled-components"
import Button from "../../Buttons/Button";
import ProductPrice from "../ProductPrice";
import { useShoppingCartVar } from "../../../services/hooks/apollo_vars/useShoppingCartVar";
import { useLastProductPageVar } from "../../../services/hooks/apollo_vars/useLastProductPageVar";
import { LangContext } from "../../Layouts/Layout";
import { ProductFetched } from "../../../interfaces/InterfaceProduct";
import { PurchasesCount } from "../../../styles/PurchasesCount";
import { ProductInCart } from "../../../interfaces/InterfaceProduct";
import toast from 'react-hot-toast';
import ImageSVG from "../../ImageSVG";
import PopUpWindow from "../../PopUp/PopUpWindow";
import OrderDetails from "../../ShoppingCart/OrderDetails/OrderDetails";
import PopUpToaster from "../../PopUp/PopUpToaster";
import { makeProductUrlFromOgUrl } from "../../../services/makeProductUrlFromOgUrl";

type ProductProps = {
    data: ProductFetched
    gatsbyImagePath?: object | undefined | any
}

const StyledProductThumb = styled.div`
    height: 320px;
    min-width: 225px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    box-shadow: 0px 0px 12px -2px rgba(0,0,0,0.5);
    img {
        width:100%;
        height: 240px;
        object-fit: cover;
    }
`;

const ProductLink = styled.a`
    position: relative;
    display: block;
`;

const ProductCaption = styled.div`
    font-family: 'Noto Serif';
    font-size: 20px;
    height: 55px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p {
        width: auto;
        text-align: left;
        margin: 0;
    }
`;

const ProductThumb = (props: ProductProps) => {

    const { language, langPrefix } = useContext(LangContext);
    const { PRODUCT_SKU, NO_PRODUCT_IMAGE, PRODUCT_ADDED_TO_CART, PRODUCT_NOT_ENOUGH_IN_STOCK } = require(`../../../languages/${language}/languages`);

    const { data, gatsbyImagePath } = props;
    const sku = data.sku === '' ? data.id : data.sku;

    const [showPopUpWindow, setShowPopUpWindow] = useState<boolean>(false);

    const imageSource = gatsbyImagePath ? process.env.GATSBY_SITE_URL + gatsbyImagePath : data.images.length > 0 ? data.images[0].src : 'https://admin.malinikids.com/wp-content/uploads/woocommerce-placeholder.png';
    const imageAlt = data.images.length > 0 ? data.images[0].alt : NO_PRODUCT_IMAGE;

    const url = gatsbyImagePath
        ? `${process.env.GATSBY_SITE_URL}/${makeProductUrlFromOgUrl(data.categories[0].slug, data.yoast_head_json.og_url, language)}`
        : `${process.env.GATSBY_SITE_URL}/${langPrefix}product?id=${data.id}`;

    const { data: inCartProducts, add: addToCart } = useShoppingCartVar();
    const { save: saveLastProductPage } = useLastProductPageVar();
    const quantityInCart = inCartProducts[data.id] && inCartProducts[data.id].quantity;

    function buttonOnClickHandler(): void {

        const shoppingCart: Array<ProductInCart> = Object.values(inCartProducts);

        addToCart(data.id, data);
        saveLastProductPage();

        if (shoppingCart.length < 1 || shoppingCart[0].quantity && shoppingCart[0].quantity < 1) {
            setShowPopUpWindow(true)
        }
        else toast(toastMessage(), {
            duration: 1500
        });
    }

    function toastMessage() {
        const quantity = quantityInCart ? quantityInCart : 0;
        return data.stock_quantity
            ? quantity + 1 <= data.stock_quantity
                ? PRODUCT_ADDED_TO_CART + ' ✅'
                : PRODUCT_NOT_ENOUGH_IN_STOCK + ' 🚫'
            : PRODUCT_ADDED_TO_CART + ' ✅';
    }

    function thumbOnClickHandler(): void {
        saveLastProductPage();
    }

    return (
        <StyledProductThumb onClick={thumbOnClickHandler}>
            <ProductLink href={url}>
                <img src={imageSource} alt={imageAlt} />
            </ProductLink>
            <ProductCaption>
                <div>
                    <p>{PRODUCT_SKU}: {sku}</p>
                    <ProductPrice price={data.price} salePrice={data.sale_price} />
                </div>
                <Button buttonSize="shrink" buttonStyle="transparent" onClick={buttonOnClickHandler}>
                    <ImageSVG path={`/svg/cart/${data.sale_price ? 'discount_cart' : 'add_to_cart'}.svg`} width="25px" height="25px" />
                    {
                        quantityInCart &&
                        <PurchasesCount>
                            <p>{quantityInCart}</p>
                        </PurchasesCount>
                    }
                </Button>
            </ProductCaption>
            <PopUpToaster />
            <PopUpWindow visible={showPopUpWindow} setVisible={setShowPopUpWindow} >
                <OrderDetails />
            </PopUpWindow>
        </StyledProductThumb >
    )
}

export default ProductThumb;