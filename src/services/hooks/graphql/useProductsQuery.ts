import { ApolloError, gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { ProductFetched } from "../../../interfaces/InterfaceProduct";

type ProductsQueryResult = {
    data: [ProductFetched] | undefined
    loading: boolean
    error: ApolloError | undefined
}

export function useProductsQuery(language: string = 'ru', options: any = undefined): ProductsQueryResult {

    const [getWcProducts, { loading, error, data }] = useLazyQuery(gql`
        
        query getWcProducts($params: WC_ProductParams) {
            allWcProducts(params: $params) {
                id
                sku
                name
                price
                sale_price
                stock_quantity
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