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

        const formData = new FormData(formElement);

        return fetch(process.env.GATSBY_APOLLO_SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: 'mutation createOrder($data: OrderDataInput!) { wpWcCreateOrder(data: $data) { id }}',
                variables: {
                    data: {
                        payment_method: formElement.payment_method.getAttribute('selected-value'),
                        shipping: {
                            first_name: formData.get('first_name'),
                            last_name: formData.get('last_name'),
                            address_1: formData.get('address_1') ? formData.get('address_1') : 'Самовывоз',
                            city: formData.get('city'),
                            phone: formData.get('phone'),
                        },
                        billing: {
                            first_name: formData.get('first_name'),
                            last_name: formData.get('last_name'),
                            phone: formData.get('phone'),
                        },
                        shipping_lines: [
                            {
                                method_id: formElement.method_title.getAttribute('selected-value'),
                                method_title: formData.get('method_title')
                            }
                        ],
                        line_items: getLineItemsData(orderedProducts),
                    }
                }
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                localStorage.removeItem('purchased-products');
                result.data.wpWcCreateOrder;
            })
            .catch((error) => { console.log(error) })
            .finally(() => { setIsSending(false); })
    }

    function getLineItemsData(orderedProducts: object | any): Array<LineItem> {

        let lineItems: Array<LineItem> = [];

        Object.values(orderedProducts).forEach((product: | any) =>
            lineItems.push({ 'product_id': parseInt(product.id), 'quantity': product.quantity }));

        return lineItems;
    }

    return {
        send,
        isSending
    }
}