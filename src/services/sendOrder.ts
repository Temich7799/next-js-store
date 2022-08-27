type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    image: { src: string, alt: string },
    product_id: number
    quantity: number
}

export default async function sendOrder(formElement: any): Promise<number> {

    function getLineItems(): string {

        const getProducts = localStorage.getItem('ordered_products');
        let lineItems: Array<object> = [];

        if (getProducts) {

            const products = JSON.parse(getProducts);

            products.forEach((product: Product) =>
                lineItems.push({ 'product_id': product.product_id, 'quantity': product.quantity }));
        }

        return JSON.stringify(lineItems);
    }

    function getShippingData(): string {
        const formData = new FormData(formElement);
        const shippingData: any = {};
        for (let key of formData.keys()) {
            shippingData[key] = formData.get(key);
        }
        return JSON.stringify(shippingData);
    }

    function getShippingLines(): string {
        const shippingLine = {
            method_title: formElement.elements[3].value,
            method_id: formElement.elements[4].value,
        }
        const shippingLines: Array<object> = [shippingLine];
        return JSON.stringify(shippingLines);
    }

    const formData = new FormData();
    formData.append("shipping", getShippingData());
    formData.append("line_items", getLineItems());
    formData.append("shipping_lines", getShippingLines());

    const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        mode: 'cors',
        body: formData
    });

    return await response.status;
}

const data = {
    payment_method: "bacs",
    payment_method_title: "Direct Bank Transfer",
    shipping: {
        first_name: "John",
        last_name: "Doe",
        address_1: "969 Market",
        address_2: "",
        city: "San Francisco",
        postcode: "94103",
        country: "US"
    },
    line_items: [
        {
            product_id: 93,
            quantity: 2
        },
        {
            product_id: 22,
            variation_id: 23,
            quantity: 1
        }
    ],
    shipping_lines: [
        {
            method_id: "flat_rate",
            method_title: "Flat Rate",
            total: "10.00"
        }
    ]
};