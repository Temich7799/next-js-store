import { makeVar } from "@apollo/client";

type PurchasedProduct = {
    name: string
    sku: string
    price?: string
    stock_quantity: number | null
    sale_price?: string
    image: {
        alt: string
        src: string
    }
    wordpress_id: number
    quantity?: number
}

export const shoppingCartVar = makeVar(
    typeof window !== `undefined` && window.localStorage.getItem('purchased-products')
        ? JSON.parse(window.localStorage.getItem('purchased-products'))
        : {}
);


export const addToCartResolver = (productId: number, product: PurchasedProduct): void => {

    const currentVar = { ...shoppingCartVar() };

    if (currentVar.hasOwnProperty(productId)) {

        product.stock_quantity !== null
            ? currentVar[productId].quantity < product.stock_quantity && currentVar[productId].quantity++
            : currentVar[productId].quantity++;
        currentVar[productId].price = product.price;
        currentVar[productId].sale_price = product.sale_price;

        shoppingCartVar(currentVar);
    }
    else {
        product.quantity = 1;
        shoppingCartVar({ ...currentVar, [productId]: product });
    }

    saveToLocalStorage();
}

export const decreasePurchasedProductQuantityResolver = (productId: number): void => {

    const newVar: any = { ...shoppingCartVar() };

    if (newVar[productId].quantity > 1) {
        newVar[productId].quantity--;
        shoppingCartVar(newVar);
    }

    saveToLocalStorage();
}

export const deletePurchasedProductResolver = (productId: number): void => {

    const newVar: any = { ...shoppingCartVar() };
    delete newVar[productId];
    shoppingCartVar(newVar);

    saveToLocalStorage();
}

export const updatePurchasedProductPriceResolver = (productId: number, product: PurchasedProduct) => {

    const newVar: any = { ...shoppingCartVar() };

    if (newVar[productId]) {
        newVar[productId].price = product.price;
        newVar[productId].sale_price = product.sale_price;
        shoppingCartVar(newVar)

        saveToLocalStorage();
    }
}

function saveToLocalStorage(): void {
    typeof window !== `undefined` && window.localStorage.setItem('purchased-products', JSON.stringify(shoppingCartVar()));
}