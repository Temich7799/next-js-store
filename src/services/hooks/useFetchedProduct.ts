import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { updatePurchasedProductPriceResolver } from "../../graphql/vars/shoppingCartVar";

type PurchasedProductProps = {
    name: string
    sku: string
    price: string
    stock_status: string
    stock_quantity: number | null
    sale_price: string
    image: {
        alt: string
        src: string
    }
    id: number
    quantity: number

}

export default function useFetchedProducts(product: PurchasedProductProps) {

    const [isOutOfStock, setIsOutOfStock] = useState<boolean>(false);

    const [getProductFetchData, { loading, error, data }] = useLazyQuery(gql`
    query getProductFetchData($wpWcProductId: Int!) {
        wpWcProduct(id: $wpWcProductId) {
            price
            sale_price
            stock_status
            stock_quantity
        }
    }
`);

    useEffect(() => {
        getProductFetchData({ variables: { wpWcProductId: product.id } });
    }, []);

    useEffect(() => {
        if (data) {

            setIsOutOfStock(
                data.wpWcProduct.stock_status == 'instock' || data.wpWcProduct.stock_quantity > 0
                    ? false
                    : true
            );

            updateProduct();
        }
    }, [data]);

    function updateProduct() {

        product.price = data.wpWcProduct.price;
        product.sale_price = data.wpWcProduct.sale_price;

        product.stock_quantity = data.wpWcProduct.stock_quantity;
        product.stock_status = data.wpWcProduct.stock_status;

        updatePurchasedProductPriceResolver(product.id, product);
    }

    return {
        loading,
        error,
        data,
        isOutOfStock,
    }
}