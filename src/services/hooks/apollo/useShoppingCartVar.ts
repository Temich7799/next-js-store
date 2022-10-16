import { makeVar, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { ProductFetched, ProductInCart } from "../../../types/InterfaceProduct";

type Result = {
    data: any
    add: (productId: string, product: ProductFetched) => void
    decrease: (productId: string) => void
    clear: (productId: string) => void
    update: (productId: string, product: ProductFetched) => void
    isInTheCart(productId: string): boolean
}

export const shoppingCartVar: any = makeVar({});

export function useShoppingCartVar(): Result {

    useEffect(() => {
        const localStorage = window.localStorage.getItem('purchased-products');
        localStorage && shoppingCartVar(JSON.parse(localStorage));
    }, []);

    const addToCart = (productId: string, product: ProductFetched): void => {

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

    const decreaseQuantity = (productId: string): void => {

        const newVar = { ...shoppingCartVar() };

        if (newVar[productId].quantity > 1) {
            newVar[productId].quantity--;
            shoppingCartVar(newVar);
        }

        saveToLocalStorage();
    }

    const clearCart = (productId: string): void => {

        const newVar: any = { ...shoppingCartVar() };
        delete newVar[productId];
        shoppingCartVar(newVar);

        saveToLocalStorage();
    }

    const updateCart = (productId: string, product: ProductFetched) => {

        const newVar: any = { ...shoppingCartVar() };

        if (newVar[productId]) {
            newVar[productId].price = product.price;
            newVar[productId].sale_price = product.sale_price;
            shoppingCartVar(newVar)

            saveToLocalStorage();
        }
    }

    function checkForTheProduct(productId: string): boolean {
        return shoppingCartVar().hasOwnProperty(productId);
    }

    function saveToLocalStorage(): void {
        window.localStorage.setItem('purchased-products', JSON.stringify(shoppingCartVar()));
    }

    return {
        data: useReactiveVar(shoppingCartVar),
        add: addToCart,
        decrease: decreaseQuantity,
        clear: clearCart,
        update: updateCart,
        isInTheCart: checkForTheProduct,
    }
}


