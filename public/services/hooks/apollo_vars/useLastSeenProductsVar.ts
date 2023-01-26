import { makeVar, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { ProductFetched } from "../../../interfaces/InterfaceProduct";

type Result = {
    data: any
    add: (productId: string, product: ProductFetched) => void
}

export const lastSeenVar: any = makeVar({});

export function useLastSeenProductsVar(): Result {

    useEffect(() => {
        const localStorage = window.localStorage.getItem('last-seen-products');
        localStorage && lastSeenVar(JSON.parse(localStorage));
    }, []);

    const add = (productId: string, product: ProductFetched): void => {

        const currentVar = { ...lastSeenVar(), [productId]: product };

        if (!checkForTheProduct(productId)) lastSeenVar(currentVar);

        saveToLocalStorage();
    }

    function checkForTheProduct(productId: string): boolean {
        return lastSeenVar().hasOwnProperty(productId);
    }

    function saveToLocalStorage(): void {
        window.localStorage.setItem('last-seen-products', JSON.stringify(lastSeenVar()));
    }

    return {
        data: useReactiveVar(lastSeenVar),
        add
    }
}


