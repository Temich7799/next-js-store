import React, { useContext, useEffect, useState } from "react"
import { useFetchProduct } from "../../services/hooks/graphql/useFetchProduct";
import ContainerCenteredWrapper from "../Wrappers/ContainerCenteredWrapper";
import { LangContext } from "../Layouts/Layout";
import LoadingBar from "../LoadingBars/LoadingBar";
import NotFoundPageContent from "./NotFoundPageContent";
import ProductPageContent from "./ProductPageContent";

type ProductClientPageContentProps = {
    search: string
}

const ProductClientPageContent = (props: ProductClientPageContentProps) => {

    const { language } = useContext(LangContext);

    const productId = parseInt(props.search.split('=')[1]);

    const { data, loading, error } = useFetchProduct(productId, language);

    return (
        <>
            {
                error
                    ? <NotFoundPageContent />
                    : loading
                        ?
                        <ContainerCenteredWrapper>
                            <LoadingBar />
                        </ContainerCenteredWrapper>
                        : data && <ProductPageContent data={data} />
            }
        </>
    )
}

export default ProductClientPageContent;