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

type ShippingData = {
    first_name: string
    last_name: string
    address_1: string
    city: string
    phone: string
}

type LineItem = {
    product_id: number
    quantity: number
}

export function useSendOrder() {

    const [data, setData] = useState<object>({});
    const [isSending, setIsSending] = useState(false);

    async function send(formElement: any, orderedProducts: object | any | Product): Promise<any> {

        setIsSending(true);

        return fetch('http://localhost:3000/graphql', {
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
                setData(result.data.wpWcCreateOrder);
                setIsSending(false);
                return result;
            });
    }

    function getLineItemsData(orderedProducts: object | any): Array<LineItem> {

        let lineItems: Array<LineItem> = [];

        Object.values(orderedProducts).forEach((product: | any) =>
            lineItems.push({ 'product_id': product.wordpress_id, 'quantity': product.quantity }));

        return lineItems;
    }

    return {
        data,
        isSending,
        send
    }
}