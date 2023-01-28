import { ApolloError, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { FETCH_WC_PRODUCTS } from "../../../apollo/gql/getAllWcProducts";
import { ProductFetched } from "../../../interfaces/InterfaceProduct";
import { FetchProductsQueryParams } from "../../../types/FetchProductsQueryParamsType";

type ProductQueryResult = {
    data: Array<ProductFetched | null> | undefined
    loading: boolean
    error: ApolloError | undefined
}

export function useFetchProductsOnScroll(queryParams: FetchProductsQueryParams, existingData: Array<ProductFetched | null> = []): ProductQueryResult {

    const [fetchOffset, setFetchOffset] = useState<number>(existingData.length > 0 ? existingData.length : 0);
    const [fetchLimit, setFetchLimit] = useState<number>(50);

    const [makeQuery, { loading, error, data, fetchMore }] = useLazyQuery(FETCH_WC_PRODUCTS);

    const makeQueryParams = {
        variables: {
            params: {
                ...queryParams,
                stock_status: 'instock',
                status: 'publish',
                offset: fetchOffset
            }
        },
    }

    const fetchMoreParams = {
        variables: {
            params: {
                ...makeQueryParams.variables.params,
                per_page: fetchLimit,
            }
        }
    }

    const makeFirstQuery = () => {

        makeQueryParams.variables.params.per_page = Math.floor((window.innerHeight * window.innerWidth) / 20000);

        makeQuery(makeQueryParams).then((response) => {
            setFetchOffset(response.data.allWcProducts.length + fetchOffset);
        });
    }

    useEffect(() => {

        setFetchLimit(Math.floor((window.innerHeight * window.innerWidth) / 20000));

        existingData.length === 0 && makeFirstQuery();
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

            fetchOffset > existingData.length
                ? fetchMore(fetchMoreParams).then((response) => {
                    setFetchOffset(response.data.allWcProducts.length + fetchOffset);
                    window.removeEventListener('scroll', onScrollHandler);
                })
                : makeFirstQuery();
        }
    }

    return {
        data: existingData.concat(data ? data.allWcProducts : []),
        loading,
        error,
    }
}