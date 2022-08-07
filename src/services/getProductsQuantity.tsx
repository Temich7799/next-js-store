type Product = {
    product_id: string
    quantity: number
}

export function getProductsQuantity(): number {

    let quantity = 0;

    const products = localStorage.getItem('ordered_products');

    if (products) {
        JSON.parse(products).forEach((product: Product) => {
            quantity = quantity + product.quantity;
        });
    }

    return quantity;
}