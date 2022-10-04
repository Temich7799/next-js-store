import React, { useEffect, useState } from "react"
import Layout from "../components/Layouts/Layout";
import LoadingBar from "../components/LoadingBars/LoadingBar";
import ProductPageContent from "../components/Products/ProductPageContent";
import { GET_WP_PRODUCT } from "../graphql/queries/getWpProduct";
import ContainerCentered from "../styles/ContainerCentered";
import NotFoundPage from "./404";

const ProductClientPage = () => {

    const [productData, setProductData] = useState();
    const [fetchError, setFetchError] = useState<boolean>(false);

    useEffect(() => {
        fetch(process.env.GATSBY_APOLLO_SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: GET_WP_PRODUCT,
                variables: {
                    productId: parseProductIdFromUrl()
                }
            }),
        })
            .then((response) => response.json())
            .then((result) => {
                setProductData(result.data.wpWcProduct);
                setFetchError(false);
            })
            .catch(() => {
                setFetchError(true);
            })
    }, []);

    function parseProductIdFromUrl(): number {
        return parseInt(window.document.location.search.split('=')[1]);
    }

    return (
        <>
            {
                fetchError === true
                    ? <NotFoundPage />
                    : <Layout>
                        <main>
                            {
                                productData === undefined
                                    ?
                                    <ContainerCentered>
                                        <LoadingBar />
                                    </ContainerCentered>
                                    : <ProductPageContent data={productData} relatedProductsIds={productData.relatedProductsIds} />
                            }
                        </main>
                    </Layout >
            }
        </>
    )
}

export default ProductClientPage;