import { useMutation } from "@apollo/client"
import { CREATE_WP_ORDER } from "../../graphql/queries/createWpOrder"

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

export function useOrder() {

    const [createWpOrder, { data }] = useMutation(CREATE_WP_ORDER);

    function sendOrder(formElement: any, orderedProducts: object | any | Product) {
        createWpOrder({
            variables: {
                data: {
                    payment_method: "",
                    shipping: getShippingData(formElement),
                    line_items: getLineItemsData(orderedProducts),
                    shipping_lines: [
                        {
                            method_title: formElement.elements[3].value,
                            method_id: formElement.elements[4].value,
                        }
                    ],
                }
            }
        });
    }

    function getShippingData(formElement: any): ShippingData | void {

        const shippingData: any = {};

        for (let element of formElement.elements) {
            if (element.name) shippingData[element.name] = element.value;
        }

        return shippingData;
    }

    function getLineItemsData(orderedProducts: object | any): Array<LineItem> {
        console.log(orderedProducts)
        let lineItems: Array<LineItem> = [];

        Object.values(orderedProducts).forEach((product: | any) =>
            lineItems.push({ 'product_id': product.product_id, 'quantity': product.quantity }));

        return lineItems;
    }

    return {
        data,
        sendOrder
    }
}
