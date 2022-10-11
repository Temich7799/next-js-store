import { ApolloError, gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

type ProductQueryResult = {
    data: any | undefined
    loading: boolean
    error: ApolloError | undefined
}

export function useQueryProductsOnScroll(categoryId: string): ProductQueryResult {

    const [fetchOffset, setFetchOffset] = useState<number>(0);
    const [fetchLimit, setFetchLimit] = useState<number>(50);

    const [makeQuery, { loading, error, data, fetchMore }] = useLazyQuery(gql`
    
        query getAllWpProducts($params: WC_ProductParams) {
            allWcProducts(params: $params) {
                name
                id
                price
                sku
                stock_quantity
                stock_status
                sale_price
                images {
                    alt
                    src
                }
                categories {
                    slug
                }
            }
        }
    `);

    useEffect(() => {

        setFetchLimit(Math.floor((window.innerHeight * window.innerWidth) / 10000));

        makeQuery({
            variables: {
                params: {
                    category: categoryId,
                    stock_status: 'instock',
                    status: 'publish',
                    per_page: Math.floor((window.innerHeight * window.innerWidth) / 10000),
                    offset: fetchOffset
                }
            }
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