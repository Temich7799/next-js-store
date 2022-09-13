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

export default function useUpdatedProduct(product: ProductProps) {

    const [isOutOfStock, setIsOutOfStock] = useState<boolean>(false);
    const [updatedData, setUpdatedData] = useState<UpdatedProduct | ProductProps | any>(product);

    const [getProductFetchData, { loading, error }] = useLazyQuery(gql`
        query getProductFetchData($productId: Int!) {
            wpWcProduct(productId: $productId) {
                price
                sale_price
                stock_status
                stock_quantity
            }
        }
    `);

    useEffect(() => {
        getProductFetchData({ variables: { productId: product.wordpress_id } })
            .then((response) => {
                setIsOutOfStock(
                    response.data.wpWcProduct.stock_status == 'instock' || response.data.wpWcProduct.stock_quantity > 0
                        ? false
                        : true
                );

                setUpdatedData({
                    ...product,
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