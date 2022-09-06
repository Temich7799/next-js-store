import React from "react"
import styled from "styled-components"
import { ORDER_FINAL_BUTTON_DISABLED, PRODUCT_SKU } from "../../../languages/ru/languages";
import ProductPrice from "../ProductPrice";
import PurchasedProductQuantity from "./PurchasedProductQuantity";

const StyledPurchasedProducts = styled.div`
    max-height: 200px;
    width: 100%;
    overflow: scroll;
`;

const PurchasedProductDetails = styled.div`
    height: fit-content;
    width: 100%;
    max-width: 430px;
    margin: 5px 0;
    display: grid;
    grid-template-columns: 65px 0.5fr 1fr 0.8fr;
    justify-content: space-around;
    align-items: center;
    gap: 10px;
`;

const PurchasedProductThumb = styled.img`
    width: 65px;
    height: 65px;
    object-fit: cover;
`;

const PurchasedProductName = styled.div`
    p {
        display: inline-block;
        margin: 2.5% 0;
        font-weight: 700;
        :nth-child(2n) {
            font-weight: 400;
            font-size: 12px;
        }
    } 
`;

type PurchasedProduct = {
    name: string
    slug: string
    sku: string
    price: string
    sale_price: string
    images: [{
        alt: string
        localFile: any
    }]
    wordpress_id: number
    quantity: number
}

const PurchasedProducts = (props: any) => {

    const { data } = props;

    return (
        <StyledPurchasedProducts id="ordered_products">
            <hr />
            {
                data && data.length
                    ? data.map((product: PurchasedProduct) =>
                        <PurchasedProductDetails>
                            <PurchasedProductThumb src={product.images[0].localFile.childImageSharp.gatsbyImageData.images.fallback.src} alt={product.images[0].alt} />
                            <ProductPrice price={product.price} salePrice={product.sale_price} />
                            <PurchasedProductName>
                                <p>{product.name}</p>
                                <p>{PRODUCT_SKU}: {product.sku}</p>
                            </PurchasedProductName>
                            <PurchasedProductQuantity data={product} />
                        </PurchasedProductDetails>
                    )
                    : <p>{ORDER_FINAL_BUTTON_DISABLED}</p>
            }
            <hr />
        </StyledPurchasedProducts>
    )
}

export default PurchasedProducts;
