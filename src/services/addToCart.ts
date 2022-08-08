type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    image: { src: string, alt: string },
    product_id: number
    quantity: number
}

export function addToCart(newProduct: Product) {

    const getProducts = localStorage.getItem('ordered_products');

    let isIdMatched = false;

    function uptadeOrderedProducts(getProducts: string): Array<object> {

        const products = JSON.parse(getProducts);

        products.forEach((product: Product) => {
            if (product.product_id == newProduct.product_id) {
                newProduct.quantity++;
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