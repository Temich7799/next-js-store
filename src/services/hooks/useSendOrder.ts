import { useState } from "react"

type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    image: { src: string, alt: string },
    product_id: number
    quantity: number
}

type LineItem = {
    product_id: number
    quantity: number
}

export function useSendOrder() {

    const [isSending, setIsSending] = useState(false);

    async function send(formElement: any, orderedProducts: object | any | Product): Promise<any> {

        setIsSending(true);

        return fetch('http://server.malinikids.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: 'mutation createOrder($data: OrderDataInput!) { wpWcCreateOrder(data: $data) { id }}',
                variables: {
                    data: {
                        payment_method: formElement.elements[6].value,
                        shipping: {
                            first_name: formElement.elements[0].value,
                            last_name: formElement.elements[1].value,
                            address_1: formElement.elements[10].value ? formElement.elements[10].value : 'Самовывоз',
                            city: formElement.elements[8].value,
                            phone: formElement.elements[2].value
                        },
                        billing: {
                            first_name: formElement.elements[0].value,
                            last_name: formElement.elements[1].value,
                            phone: formElement.elements[2].value
                        },
                        shipping_lines: [
                            {
                                method_id: formElement.elements[4].value,
                            }
                        ],
                        line_items: getLineItemsData(orderedProducts),
                    }
                }
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                setIsSending(false);
                return result.data.wpWcCreateOrder;
            });
    }

    function getLineItemsData(orderedProducts: object | any): Array<LineItem> {

        let lineItems: Array<LineItem> = [];

        Object.values(orderedProducts).forEach((product: | any) =>
            lineItems.push({ 'product_id': product.wordpress_id, 'quantity': product.quantity }));

        return lineItems;
    }

    return {
        send,
        isSending
    }
}