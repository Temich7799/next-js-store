type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    image: { src: string, alt: string },
    product_id: number
    quantity: number
}

export default function sendOrder(): boolean | void {

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
        const formData = new FormData(document.getElementById("shopping_cart_form"));
        const shippingData: any = {};
        for (let key of formData.keys()) {
            shippingData[key] = formData.get(key);
        }
        return JSON.stringify(shippingData);
    }

    const formData = new FormData();
    formData.append("shipping", getShippingData());
    formData.append("line_items", getLineItems());

    fetch('http://localhost:3000/orders', {
        method: 'POST',
        mode: 'cors',
        body: formData
    })

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