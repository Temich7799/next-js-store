import { makeVar, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
interface PurchasedProductProps {
    name: string
    sku: string
    price: string
    sale_price: string
    stock_status: string
    stock_quantity: number | null
    image: {
        alt: string
        src: string
    }
    wordpress_id: number
    id?: string
    quantity?: number
}

export const shoppingCartVar: any = makeVar({});

export function useShoppingCartVar() {

    useEffect(() => {
        const localStorage = window.localStorage.getItem('purchased-products');
        localStorage && shoppingCartVar(JSON.parse(localStorage));
    }, []);

    const addToCart = (productId: number, product: PurchasedProductProps): void => {

        const currentVar = { ...shoppingCartVar() };

        if (checkForTheProduct(productId)) {

            product.stock_quantity !== null
                ? currentVar[productId].quantity < product.stock_quantity && currentVar[productId].quantity++
                : currentVar[productId].quantity++;
            currentVar[productId].price = product.price;
            currentVar[productId].sale_price = product.sale_price;

            shoppingCartVar(currentVar);
        }
        else {
            shoppingCartVar({ ...currentVar, [productId]: { ...product, quantity: 1 } });
        }

        saveToLocalStorage();
    }

    const decreaseQuantity = (productId: number): void => {

        const newVar: any = { ...shoppingCartVar() };

        if (newVar[productId].quantity > 1) {
            newVar[productId].quantity--;
            shoppingCartVar(newVar);
        }

        saveToLocalStorage();
    }

    const clearCart = (productId: number): void => {

        const newVar: any = { ...shoppingCartVar() };
        delete newVar[productId];
        shoppingCartVar(newVar);

        saveToLocalStorage();
    }

    const updateCart = (productId: number, product: PurchasedProductProps) => {

        const newVar: any = { ...shoppingCartVar() };

        if (newVar[productId]) {
            newVar[productId].price = product.price;
            newVar[productId].sale_price = product.sale_price;
            shoppingCartVar(newVar)

            saveToLocalStorage();
        }
    }

    const checkForTheProduct = (productId: number): boolean => {
        return shoppingCartVar().hasOwnProperty(productId);
    }

    function saveToLocalStorage(): void {
        window.localStorage.setItem('purchased-products', JSON.stringify(shoppingCartVar()));
    }

    return {
        add: addToCart,
        decrease: decreaseQuantity,
        clear: clearCart,
        update: updateCart,
        data: <any>useReactiveVar(shoppingCartVar),
        isInTheCart: checkForTheProduct
    }
}


