import { ApolloError, gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ProductBase, ProductFetched } from "../../interfaces/InterfaceProduct";

type Result = {
    data: ProductFetched
    loading: boolean
    error: ApolloError | undefined
    isOutOfStock: boolean
}

export default function useUpdatedProduct(productToUpdate: ProductBase): Result {

    const [isOutOfStock, setIsOutOfStock] = useState<boolean>(false);
    const [data, setData] = useState<ProductFetched | any>(productToUpdate);

    const [getProductFetchData, { loading, error }] = useLazyQuery(gql`
        query getProductFetchData($productId: Int!) {
            wpWcProduct(productId: $productId) {
                name
                price
                sale_price
                stock_quantity
                stock_status
                status
            }
        }
    `);

    useEffect(() => {
        getProductFetchData({ variables: { productId: parseInt(productToUpdate.id) } })
            .then((response) => {
                
                if (response.data) {
                    setIsOutOfStock(
                        response.data.wpWcProduct.stock_status === 'instock' || response.data.wpWcProduct.status === 'publish' || response.data.wpWcProduct.stock_quantity > 0
                            ? false
                            : true
                    );

                    setData({
                        ...productToUpdate,
                        ...response.data.wpWcProduct
                    })
                }
            });
    }, []);

    return {
        data,
        loading,
        error,
        isOutOfStock,
    }
}