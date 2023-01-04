import { ApolloError, gql, useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Product } from "../../../interfaces/InterfaceProduct";

type ProductQueryResult = {
    data: Product | undefined
    loading: boolean
    error: ApolloError | undefined
}

export function useFetchProduct(productId: number | undefined, language: string = 'ru'): ProductQueryResult {

    const [getWcProduct, { data, loading, error }] = useLazyQuery(gql`
        query getWcProduct($productId: Int! $language: LanguagesEnum) {
            wpWcProduct(productId: $productId, language: $language) {
                name
                sku
                price
                sale_price
                stock_quantity
                stock_status    
                description
                related_ids
                id
                attributes {
                    options
                    name
                }
                images {
                    alt
                    src
                }
                categories {
                    slug
                }
            }
        }`,
        {
            variables: {
                productId: productId,
                language: language
            }
        })

    useEffect(() => {
        getWcProduct();
    }, []);

    return {
        data: data && data.wpWcProduct,
        loading: loading,
        error: error,
    }
}