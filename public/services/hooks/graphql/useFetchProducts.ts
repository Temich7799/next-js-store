import { ApolloError, gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { FETCH_WC_PRODUCTS } from "../../../components/apollo/gql/getAllWcProducts";
import { ProductFetched } from "../../../interfaces/InterfaceProduct";

type ProductsQueryResult = {
    data: [ProductFetched] | undefined
    loading: boolean
    error: ApolloError | undefined
}

export function useFetchProducts(language: string = 'ru', options: any = undefined): ProductsQueryResult {

    const [getWcProducts, { loading, error, data }] = useLazyQuery(FETCH_WC_PRODUCTS);

    useEffect(() => {
        getWcProducts(
            {
                variables: {
                    language: language,
                    params: {
                        ...options,
                        stock_status: 'instock',
                        status: 'publish'
                    }
                }
            })
    }, []);

    return {
        data: data ? data.allWcProducts : data,
        loading,
        error
    }
}