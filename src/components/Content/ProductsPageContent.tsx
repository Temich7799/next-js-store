import React, { useContext } from "react";
import styled from "styled-components";
import { useQueryProductsOnScroll } from "../../services/hooks/graphql/useQueryProductsOnScroll";
import ContainerCentered from "../../styles/ContainerCentered";
import InfoLayout from "../Layouts/InfoLayout";
import { LangContext } from "../Layouts/Layout";
import LoadingBar from "../LoadingBars/LoadingBar";
import ProductThumb from "../Products/Thumbs/ProductThumb";

type ProductsPageContentProps = {
    gatsbyImages: Map<number, string>
    categoryId: string
}

type FetchedProduct = {
    name: string
    slug: string
    sku: string
    price: string
    sale_price: string
    stock_quantity: number
    stock_status: string
    id: string
    categories: [
        {
            slug: string
        }
    ]
    images: [
        {
            alt: string
            src: string
        }
    ]
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

const ProductsPageContent = (props: ProductsPageContentProps) => {

    const { language } = useContext(LangContext);
    const { LOADING_ERROR_DESCRIPTION, LOADING_ERROR_TITLE } = require(`../../languages/${language}/languages`);

    const { gatsbyImages, categoryId } = props;

    const { data, loading, error } = useQueryProductsOnScroll(categoryId);

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
                                data && data.map((product: FetchedProduct) => {

                                    const productData = {
                                        ...product,
                                        wordpress_id: parseInt(product.id)
                                    };

                                    const gatsbyImage = gatsbyImages.get(productData.wordpress_id);

                                    return <ProductThumb data={productData} gatsbyImage={gatsbyImage} key={product.id} />
                                })
                            }
                        </Content>
            }
        </>
    )
}

export default ProductsPageContent;