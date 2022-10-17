import React, { useContext } from "react";
import styled from "styled-components";
import { useQueryProductsOnScroll } from "../../services/hooks/graphql/useQueryProductsOnScroll";
import ContainerCentered from "../../styles/ContainerCentered";
import { ProductFetched } from "../../interfaces/InterfaceProduct";
import InfoLayout from "../Layouts/InfoLayout";
import { LangContext } from "../Layouts/Layout";
import LoadingBar from "../LoadingBars/LoadingBar";
import ProductThumb from "../Products/Thumbs/ProductThumb";

type ProductsListPageContentProps = {
    compImages: object | any
    categoryId: string
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

    const { compImages, categoryId } = props;
    
    const { data, loading, error } = useQueryProductsOnScroll(categoryId.toString());

    return (
        <>
            {
                loading
                    ?
                    <ContainerCentered>
                        <LoadingBar />
                    </ContainerCentered>
                    :
                    error
                        ?
                        <InfoLayout title={LOADING_ERROR_TITLE} description={LOADING_ERROR_DESCRIPTION} imagePath={""} />
                        : <Content>
                            {
                                data && data.map((product: ProductFetched) => {

                                    const gatsbyImagePath = compImages[parseInt(product.id)];

                                    return <ProductThumb data={product} gatsbyImagePath={gatsbyImagePath} key={product.id} />
                                })
                            }
                        </Content>
            }
        </>
    )
}

export default ProductsListPageContent;