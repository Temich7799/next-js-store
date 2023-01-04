import { makeVar, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";

export const lastProductPageUrlVar = makeVar('');

export function useLastProductPageVar() {

    useEffect(() => {
        const localStorage = window.localStorage.getItem('last-products-page-url');
        lastProductPageUrlVar(localStorage ? localStorage : `${process.env.GATSBY_SITE_URL}/catalog`);
    }, []);

    function save(): void {

        const currentLocation = window.document.location.href;

        lastProductPageUrlVar(currentLocation);
        window.localStorage.setItem('last-products-page-url', currentLocation);
    }

    return {
        save,
        url: useReactiveVar(lastProductPageUrlVar)
    }
}


