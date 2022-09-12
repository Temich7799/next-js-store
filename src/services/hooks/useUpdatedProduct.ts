import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { updatePurchasedProductPriceResolver } from "../../graphql/vars/shoppingCartVar";

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

    const [getProductFetchData, { loading, error, data }] = useLazyQuery(gql`
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
        getProductFetchData({ variables: { productId: product.wordpress_id } });
    }, []);

    useEffect(() => {
        if (data) {

            setIsOutOfStock(
                data.wpWcProduct.stock_status == 'instock' || data.wpWcProduct.stock_quantity > 0
                    ? false
                    : true
            );

            updateProduct(data);
        }
    }, [data]);

    function updateProduct(data: any) {

        const updatedProduct: UpdatedProduct = {
            ...product,
            price: data.wpWcProduct.price,
            sale_price: data.wpWcProduct.sale_price,
            stock_quantity: data.wpWcProduct.stock_quantity,
            stock_status: data.wpWcProduct.stock_status
        };

        updatePurchasedProductPriceResolver(product.wordpress_id, updatedProduct);
    }

    return {
        loading,
        error,
        data,
        isOutOfStock,
    }
}