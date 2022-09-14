import { makeVar, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";

type PurchasedProductProps = {
    name: string
    sku: string
    price?: string
    stock_status: string
    stock_quantity: number | null
    sale_price: string
    image: {
        alt: string
        src: string
    }
    wordpress_id: number
}

export const shoppingCartVar = makeVar([{}]);

export function useShoppingCartVar() {

    useEffect(() => {
        shoppingCartVar(JSON.parse(window.localStorage.getItem('purchased-products')));
    }, []);

    const add = (productId: number, product: PurchasedProductProps): void => {

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
            shoppingCartVar({ ...currentVar, [productId]: { ...product, quantity: 1 } });
        }

        saveToLocalStorage();
    }

    const decrease = (productId: number): void => {

        const newVar: any = { ...shoppingCartVar() };

        if (newVar[productId].quantity > 1) {
            newVar[productId].quantity--;
            shoppingCartVar(newVar);
        }

        saveToLocalStorage();
    }

    const clear = (productId: number): void => {

        const newVar: any = { ...shoppingCartVar() };
        delete newVar[productId];
        shoppingCartVar(newVar);

        saveToLocalStorage();
    }

    const update = (productId: number, product: PurchasedProductProps) => {

        const newVar: any = { ...shoppingCartVar() };

        if (newVar[productId]) {
            newVar[productId].price = product.price;
            newVar[productId].sale_price = product.sale_price;
            shoppingCartVar(newVar)

            saveToLocalStorage();
        }
    }

    function saveToLocalStorage(): void {
        window.localStorage.setItem('purchased-products', JSON.stringify(shoppingCartVar()));
    }

    return {
        add,
        decrease,
        clear,
        update,
        data: useReactiveVar(shoppingCartVar)
    }
}


