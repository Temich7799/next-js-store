import { makeVar, useReactiveVar } from "@apollo/client";

export const isMenuOpenedVar: any = makeVar(false);

export function useIsMenuOpenedVar() {

    function setIsMenuOpenedVar(isMenuOpened: boolean): void {
        isMenuOpenedVar(isMenuOpened);
    }

    return {
        isMenuOpenedVar: <boolean>useReactiveVar(isMenuOpenedVar),
        setIsMenuOpenedVar
    }
}