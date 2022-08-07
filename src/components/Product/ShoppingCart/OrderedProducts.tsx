import React from "react"
import styled from "styled-components"
import ProductName from "../ProductAbout/ProductName";
import ProductPrice from "../ProductPrice";
import OrderedProductQuantity from "./OrderedProductQuantity";

const StyledOrderedProducts = styled.div`
    max-height: 200px;
    width: 100%;
    overflow: scroll;
`;

const OrderedProductDetails = styled.div`
    height: fit-content;
    width: 100%;
    max-width: 430px;
    margin: 5px 0;
    display: grid;
    grid-template-columns: 65px 1fr 1fr 1fr; 
    justify-content: space-around;
    align-items: center;
    gap: 10px;
`;

const OrderedProductThumb = styled.img`
    width: 65px;
    height: 65px;
    object-fit: cover;
`;

type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    image: { src: string, alt: string }
    product_id: number
}

type OrderedProductsProps = {
    data: [Product] | undefined
    setProductsHook: Function
}

const OrderedProducts = (props: OrderedProductsProps) => {

    const { data, setProductsHook } = props;

    return (
        <StyledOrderedProducts id="ordered_products">
            <hr />
            {
                data && data.length
                    ? data.map((product: Product) =>
                        <OrderedProductDetails>
                            <OrderedProductThumb src={product.image.src} alt={product.image.alt} />
                            <ProductPrice price={product.price} salePrice={product.sale_price} />
                            <ProductName name={product.name} sku={product.sku} attributes={[{ options: [""], name: "string" }]} />
                            <OrderedProductQuantity setProductsHook={setProductsHook} productId={product.product_id} />
                        </OrderedProductDetails>
                    )
                    : <p>No products yet :/</p>
            }
            <hr />
        </StyledOrderedProducts>
    )
}

export default OrderedProducts;
