type Product = {
    product_id: string
    quantity: number
}

export function addToCart(productId: number) {

    const getProducts = localStorage.getItem('ordered_products');
    const newProduct = { 'product_id': productId, 'quantity': 1 };

    let isIdMatched = false;

    function uptadeOrderedProducts(getProducts: string): Array<object> {

        const products = JSON.parse(getProducts);

        products.forEach((product: Product) => {
            if (product.product_id == productId.toString()) {
                product.quantity++;
                isIdMatched = true;
            }
        });

        !isIdMatched && products.push(newProduct);

        return products;

    }
    getProducts
        ? localStorage.setItem('ordered_products', JSON.stringify(uptadeOrderedProducts(getProducts)))
        : localStorage.setItem('ordered_products', JSON.stringify([newProduct]))
}