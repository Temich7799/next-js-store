import React from "react";
import { ProductFetched } from "../../interfaces/InterfaceProduct";
import { useProductsQuery } from "../../services/hooks/graphql/useProductsQuery";
import Carousel from "./Carousel";
import ProductThumb from "../Product/Thumbs/ProductThumb";

type CarouselWithProductsProps = {
    title: string
    params?: QueryParams | undefined
    compImages?: object | any
}

type QueryParams = {
    orderby?: string
    offset?: number
    per_page?: number
    on_sale?: boolean
    include?: [string]
    stock_status?: string
    status?: string
    category?: string
}

const CarouselWithProducts = (props: CarouselWithProductsProps) => {

    const { compImages, title, params } = props;

    const { data, loading } = useProductsQuery(params);

    return (
        <Carousel title={title} isDataFetching={loading} carouselItemMax={3}>
            {
                data !== undefined && data.map((product: ProductFetched) => {

                    const productCompImages = compImages && compImages[parseInt(product.id)];
                    const gatsbyImagePath = productCompImages && productCompImages.length >= 1 && productCompImages[0];

                    return <ProductThumb data={product} gatsbyImagePath={gatsbyImagePath} key={product.id} />
                })
            }
        </Carousel>
    )
}

export default CarouselWithProducts;