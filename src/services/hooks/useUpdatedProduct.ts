import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

type ProductProps = {
    name: string
    slug: string
    sku: string
    image: {
        alt: string
        src: string
    }
    wordpress_id: number
}

type UpdatedProduct = {
    name: string
    slug: string
    sku: string
    wordpress_id: number
    price: string
    stock_status: string
    stock_quantity: number | null
    sale_price: string
    image: {
        alt: string
        src: string
    }
}

export default function useUpdatedProduct(productToUpdateToUpdate: ProductProps) {

    const [isOutOfStock, setIsOutOfStock] = useState<boolean>(false);
    const [updatedData, setUpdatedData] = useState<UpdatedProduct | ProductProps | any>(productToUpdateToUpdate);

    const [getProductFetchData, { loading, error }] = useLazyQuery(gql`
        query getProductFetchData($productId: Int!) {
            wpWcProduct(productToUpdateToUpdateId: $productId) {
                price
                sale_price
                stock_status
                stock_quantity
            }
        }
    `);

    useEffect(() => {
        getProductFetchData({ variables: { productToUpdateToUpdateId: productToUpdateToUpdate.wordpress_id } })
            .then((response) => {
                console.log(response.data)
                setIsOutOfStock(
                    response.data.wpWcProduct.stock_status == 'instock' || response.data.wpWcProduct.stock_quantity > 0
                        ? false
                        : true
                );

                setUpdatedData({
                    ...productToUpdateToUpdate,
                    ...response.data.wpWcProduct
                })
            });
    }, []);

    return {
        loading,
        error,
        updatedData,
        isOutOfStock,
    }
}