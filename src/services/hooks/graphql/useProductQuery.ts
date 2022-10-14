import { useEffect, useState } from "react";

type ProductQueryResult = {
    data: any
    loading: boolean
    error: boolean
}

export function useProductQuery(productId: number | undefined): ProductQueryResult {

    const [data, setData] = useState();
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        productId && fetch(process.env.GATSBY_APOLLO_SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query getWpProduct($productId: Int!) {
                        wpWcProduct(productId: $productId) {
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
                    }
                `,
                variables: {
                    productId: productId
                }
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                setData(result.data.wpWcProduct);
                setError(false);
            })
            .catch(() => {
                setError(true);
            })
    }, [productId]);

    return {
        data,
        loading: !data && error === false ? true : false,
        error,
    }
}