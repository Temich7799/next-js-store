import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { ORDER_FINAL_BUTTON_BACK, ORDER_FINAL_BUTTON_CONTINUE, ORDER_FINAL_BUTTON_DISABLED, ORDER_FINAL_BUTTON_SUBMIT, ORDER_FINAL_TITLE } from "../../../../languages/ru/languages";
import Button from "../../../Button";
import LoadingSpinner from "../../../LoadingBars/LoadingSpinner";
import { Link } from "gatsby";

type OrderFinalProps = {
    data: Array<PurchasedProduct>
    isOrderSending?: boolean
}

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

const StyledOrderFinal = styled.div`
    p {
        margin: 10px 0;
        text-align: center;
        font-size: 20px;
    }
    div {  
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
    }
`;

const OrderFinal = (props: OrderFinalProps) => {

    const { data, isOrderSending } = props;

    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        data && setIsButtonDisabled(data.length ? false : true);
        setTotalPrice(calcTotalPrice(data));
    }, [data]);

    function calcTotalPrice(products: any): number {
        let price = 0;
        products && products.forEach((product: PurchasedProduct) =>
            price += (parseInt(product.sale_price ? product.sale_price : product.price)) * product.quantity);
        return price;
    }

    return (
        <StyledOrderFinal>
            <h4>{ORDER_FINAL_TITLE} </h4>
            <p>{totalPrice} $</p>
            <div>
                <Button onClick={(e: any) => e.preventDefault()}>{ORDER_FINAL_BUTTON_BACK}</Button>
                {
                    isOrderSending === false || isOrderSending === true
                        ? <Button type="submit" form="order_form" disabled={isButtonDisabled || isOrderSending} buttonStyle="accent">{!isOrderSending ? isButtonDisabled ? ORDER_FINAL_BUTTON_DISABLED : ORDER_FINAL_BUTTON_SUBMIT : <LoadingSpinner />}</Button>
                        : isButtonDisabled
                            ? <Button buttonStyle="accent" disabled={isButtonDisabled}>{ORDER_FINAL_BUTTON_DISABLED}</Button>
                            : <Link to="/shopping_cart"><Button buttonStyle="accent" disabled={isButtonDisabled}>{ORDER_FINAL_BUTTON_CONTINUE}</Button></Link>
                }
            </div>
        </StyledOrderFinal>
    )
}

export default OrderFinal;