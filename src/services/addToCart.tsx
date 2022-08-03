type OrderedProduct = {
    product_id: string
    quantity: number
}

export function addToCart(productId: number) {

    const orderedProducts = localStorage.getItem('ordered_products');
    const newProduct = { 'product_id': productId, 'quantity': 1 };

    let isIdMatched = false;

    function uptadeOrderedProducts(orderedProducts: string): Array<object> {

        const products = JSON.parse(orderedProducts);

        products.forEach((product: OrderedProduct) => {
            if (product.product_id == productId.toString()) {
                product.quantity++;
                isIdMatched = true;
            }
        });

        !isIdMatched && products.push(newProduct);
        
        return products;

    }
    orderedProducts
        ? localStorage.setItem('ordered_products', JSON.stringify(uptadeOrderedProducts(orderedProducts)))
        : localStorage.setItem('ordered_products', JSON.stringify([newProduct]))

    console.log(localStorage.getItem('ordered_products'));

}