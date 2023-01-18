import { ApolloError, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FETCH_WC_PRODUCTS } from "../../../components/apollo/gql/getAllWcProducts";
import { ProductFetched } from "../../../interfaces/InterfaceProduct";

type ProductQueryResult = {
    data: [ProductFetched] | undefined
    loading: boolean
    error: ApolloError | undefined
}

export function useFetchProductsOnScroll(categoryId: string, existingData?: [ProductFetched]): ProductQueryResult {

    const [fetchOffset, setFetchOffset] = useState<number>(0);
    const [fetchLimit, setFetchLimit] = useState<number>(50);

    const [makeQuery, { loading, error, data, fetchMore }] = useLazyQuery(FETCH_WC_PRODUCTS);

    useEffect(() => {

        setFetchLimit(Math.floor((window.innerHeight * window.innerWidth) / 20000));

        existingData && existingData.length > 0
            ? setFetchOffset(existingData.length)
            : makeQuery({
                variables: {
                    params: {
                        category: categoryId,
                        stock_status: 'instock',
                        status: 'publish',
                        per_page: Math.floor((window.innerHeight * window.innerWidth) / 20000),
                        offset: fetchOffset
                    }
                },
            }).then((response) => {
                setFetchOffset(response.data.allWcProducts.length + fetchOffset);
            });
    }, []);

    useEffect(() => {

        window.addEventListener('scroll', onScrollHandler);

        return () => {
            window.removeEventListener('scroll', onScrollHandler);
        }
    }, [fetchOffset])

    function onScrollHandler() {

        if (window.scrollY > (document.documentElement.scrollHeight - document.documentElement.clientHeight) / 3) {

            window.removeEventListener('scroll', onScrollHandler);

            fetchMore(
                {
                    variables: {
                        params: {
                            category: categoryId,
                            stock_status: 'instock',
                            status: 'publish',
                            per_page: fetchLimit,
                            offset: fetchOffset
                        }
                    }
                }
            ).then((response) => {
                setFetchOffset(response.data.allWcProducts.length + fetchOffset);
            });
        }
    }

    return {
        data: data ? data.allWcProducts : data,
        loading,
        error,
    }
}