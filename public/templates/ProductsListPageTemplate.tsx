import React, { useContext } from "react";
import styled from "styled-components";
import { useFetchProductsOnScroll } from "../services/hooks/graphql/useFetchProductsOnScroll";
import ContainerCenteredWrapper from "../components/Wrappers/ContainerCenteredWrapper";
import { ProductFetched } from "../interfaces/InterfaceProduct";
import InfoLayout from "../components/InfoLayout";
import { PageContext } from "./BaseTemplate";
import LoadingBar from "../components/LoadingBars/LoadingBar";
import ProductThumb from "../components/Product/Thumbs/ProductThumb";

type ProductsListPageTemplateProps = {
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

const ProductsListPageTemplate = (props: ProductsListPageTemplateProps) => {

    const { language } = useContext(PageContext);
    const { LOADING_ERROR_DESCRIPTION, LOADING_ERROR_TITLE } = require(`../languages/${language}/languages`);

    const { data, compImages, categoryId = 0 } = props;

    const { data: fetchedData, loading, error } = useFetchProductsOnScroll(categoryId.toString(), data);

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

export default ProductsListPageTemplate;