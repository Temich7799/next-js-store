import { ApolloError, gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

type RelatedProductsQueryResult = {
    data: any | undefined
    loading: boolean
    error: ApolloError | undefined
    hasRelatedProducts: boolean
}

export function useRelatedProducts(productId: number, relatedProductsIds?: Array<string>): RelatedProductsQueryResult {

    const [getRelatedProductsIds, { data: allWpRelatedProductsDataIds }] = useLazyQuery(gql`

        query getRelatedProductsIds($productId: Int!) {
            wpWcProduct(productId: $productId) {
                related_ids
            }
        }
        `,
        {
            variables: {
                productId: productId
            }
        }
    );

    const [getAllWpRelatedProducts, { loading, error, data }] = useLazyQuery(gql`
        
        query getAllWpRelatedProducts($params: WC_ProductParams) {
            allWcProducts(params: $params) {
                name
                price
                sku
                sale_price
                stock_quantity
                stock_status
                id
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

        relatedProductsIds
            ? getAllWpRelatedProducts(
                {
                    variables: {
                        filter: {
                            include: relatedProductsIds
                        }
                    }
                })
            : getRelatedProductsIds()
                .then((response) => {
                    getAllWpRelatedProducts(
                        {
                            variables: {
                                filter: {
                                    include: response.data.wpWcProduct.related_ids.map((id: string) => parseInt(id))
                                }
                            }
                        }
                    );
                });
    }, []);

    return {
        data: data ? data.allWcProducts : data,
        loading,
        error,
        hasRelatedProducts: allWpRelatedProductsDataIds !== undefined ? true : false
    }
}