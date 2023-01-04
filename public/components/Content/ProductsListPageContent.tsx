import React, { useContext } from "react";
import styled from "styled-components";
import { useFetchProductsOnScroll } from "../../services/hooks/graphql/useFetchProductsOnScroll";
import ContainerCenteredWrapper from "../Wrappers/ContainerCenteredWrapper";
import { ProductFetched } from "../../interfaces/InterfaceProduct";
import InfoLayout from "../Layouts/InfoLayout";
import { LangContext } from "../Layouts/Layout";
import LoadingBar from "../LoadingBars/LoadingBar";
import ProductThumb from "../Product/Thumbs/ProductThumb";

type ProductsListPageContentProps = {
    compImages?: object | any
    categoryId?: string
    data?: [ProductFetched]
}

const Content = styled.div`
    max-width: 1900px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(auto, 200px));
    justify-content: center;
    gap: 50px;
    padding: 2.5%;
`;

const ProductsListPageContent = (props: ProductsListPageContentProps) => {

    const { language } = useContext(LangContext);
    const { LOADING_ERROR_DESCRIPTION, LOADING_ERROR_TITLE } = require(`../../languages/${language}/languages`);

    const { data, compImages, categoryId = 0 } = props;

    const { data: fetchedData, loading, error } = data ? { data: data, loading: false, error: false } : useFetchProductsOnScroll(categoryId.toString());

    return (
        <>
            {
                loading
                    ?
                    <ContainerCenteredWrapper>
                        <LoadingBar />
                    </ContainerCenteredWrapper>
                    :
                    error
                        ?
                        <InfoLayout title={LOADING_ERROR_TITLE} description={LOADING_ERROR_DESCRIPTION} imagePath={""} />
                        : <Content>
                            {
                                fetchedData && fetchedData.map((product: ProductFetched) => {

                                    const productCompImages = compImages && compImages[parseInt(product.id)];
                                    const gatsbyImagePath = productCompImages && productCompImages.length >= 1 && productCompImages[0];

                                    return <ProductThumb data={product} gatsbyImagePath={gatsbyImagePath} key={product.id} />
                                })
                            }
                        </Content>
            }
        </>
    )
}

export default ProductsListPageContent;