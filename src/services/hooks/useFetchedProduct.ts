import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { updatePurchasedProductPriceResolver } from "../../graphql/vars/shoppingCartVar";

type PurchasedProductProps = {
    name: string
    slug: string
    sku: string
    price: string
    sale_price: string
    images: [{
        alt: string
        localFile: any
    }]
    wordpress_id: number
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
            manage_stock
        }
}
`);

    useEffect(() => {
        getProductFetchData({ variables: { wpWcProductId: product.wordpress_id } });
    }, []);

    useEffect(() => {
        if (data) {

            setIsOutOfStock(
                data.wpWcProduct.stock_status == 'instock' || data.wpWcProduct.stock_quantity > 0
                    ? false
                    : true
            );

            updatePrice();
        }
    }, [data]);

    function updatePrice() {
        product.price = data.wpWcProduct.price;
        product.sale_price = data.wpWcProduct.sale_price;
        updatePurchasedProductPriceResolver(product.wordpress_id, product);
    }

    return {
        loading,
        error,
        data,
        isOutOfStock,
    }
}