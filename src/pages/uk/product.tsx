import React, { useEffect, useState } from "react"
import Layout from "../../components/Layouts/Layout";
import LoadingBar from "../../components/LoadingBars/LoadingBar";
import ProductPageContent from "../../components/Content/ProductPageContent";
import ContainerCentered from "../../styles/ContainerCentered";
import NotFoundPage from "./404";
import { useProductQuery } from "../../services/hooks/graphql/useProductQuery";

const ProductClientPage = () => {

    const [productId, setProductId] = useState<number>(0);

    const { data, loading, error } = useProductQuery(productId);

    useEffect(() => {
        setProductId(parseProductIdFromUrl())
    }, [])

    function parseProductIdFromUrl(): number {
        return parseInt(window.document.location.search.split('=')[1]);
    }

    return (
        <>
            {
                error
                    ? <NotFoundPage />
                    : <Layout language="uk">
                        {
                            loading
                                ?
                                <ContainerCentered>
                                    <LoadingBar />
                                </ContainerCentered>
                                : <ProductPageContent data={data} relatedProductsIds={data.relatedProductsIds} />
                        }
                    </Layout>
            }
        </>
    )
}

export default ProductClientPage;