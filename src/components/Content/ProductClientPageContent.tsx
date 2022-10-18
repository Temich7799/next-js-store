import React, { useEffect, useState } from "react"
import { useProductQuery } from "../../services/hooks/graphql/useProductQuery";
import ContainerCentered from "../../styles/ContainerCentered";
import LoadingBar from "../LoadingBars/LoadingBar";
import NotFoundPageContent from "./NotFoundPageContent";
import ProductPageContent from "./ProductPageContent";

type ProductClientPageContentProps = {
    search: string
}

const ProductClientPageContent = (props: ProductClientPageContentProps) => {

    const productId = parseInt(props.search.split('=')[1]);

    const { data, loading, error } = useProductQuery(productId);

    return (
        <>
            {
                error
                    ? <NotFoundPageContent />
                    : loading
                        ?
                        <ContainerCentered>
                            <LoadingBar />
                        </ContainerCentered>
                        : data && <ProductPageContent data={data} />
            }
        </>
    )
}

export default ProductClientPageContent;