import { ApolloError, gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { ProductFetched } from "../../../interfaces/InterfaceProduct";

type RelatedProductsQueryResult = {
    data: [ProductFetched] | undefined
    loading: boolean
    error: ApolloError | undefined
}

export function useRelatedProducts(relatedProductsIds: Array<string> | undefined): RelatedProductsQueryResult {

    const [getAllWcRelatedProducts, { loading, error, data }] = useLazyQuery(gql`
        
        query getAllWcRelatedProducts($params: WC_ProductParams) {
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
        relatedProductsIds && getAllWcRelatedProducts(
            {
                variables: {
                    params: {
                        include: relatedProductsIds,
                        stock_status: 'instock',
                        status: 'publish'
                    }
                }
            })
    }, [relatedProductsIds]);

    return {
        data: data ? data.allWcProducts : data,
        loading,
        error
    }
}