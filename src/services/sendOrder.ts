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

    const formData = new FormData();
    formData.append("shipping", getShippingData(formElement));
    formData.append("line_items", getLineItemsData());
    formData.append("shipping_lines", getShippingLinesData(formElement));

    const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        mode: 'cors',
        body: formData
    });

    return await response.json();
}

function getShippingData(formElement: any): string {

    const shippingData: any = {};

    for (let element of formElement.elements) {
        if (element.name) shippingData[element.name] = element.value;
    }

    return JSON.stringify(shippingData);
}

function getLineItemsData(): string {

    const getProducts = localStorage.getItem('ordered_products');
    let lineItems: Array<object> = [];

    if (getProducts) {

        const products = JSON.parse(getProducts);

        products.forEach((product: Product) =>
            lineItems.push({ 'product_id': product.product_id, 'quantity': product.quantity }));
    }

    return JSON.stringify(lineItems);
}

function getShippingLinesData(formElement: any): string {

    const shippingLine = {
        method_title: formElement.elements[3].value,
        method_id: formElement.elements[4].value,
    }

    const shippingLines: Array<object> = [shippingLine];

    return JSON.stringify(shippingLines);
}
