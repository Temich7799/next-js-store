import React, { useContext } from "react";
import { ProductFetched } from "../../interfaces/InterfaceProduct";
import { useFetchProducts } from "../../services/hooks/graphql/useFetchProducts";
import Carousel from "./Carousel";
import ProductThumb from "../Product/Thumbs/ProductThumb";
import { CarouselOptions } from "../../types/CarouselPropsType";
import { PageContext } from "../../templates/BaseTemplate";

type CarouselWithFetchedProductsProps = {
    title: string
    params?: QueryParams | undefined
    compImages?: object | any
    options?: CarouselOptions
}

type QueryParams = {
    orderby?: string
    offset?: number
    per_page?: number
    on_sale?: boolean
    include?: {
        id: Array<number>
    }
    stock_status?: string
    status?: string
    category?: string
}

const CarouselWithFetchedProducts = (props: CarouselWithFetchedProductsProps) => {

    const { language } = useContext(PageContext);

    const { compImages, title, params, options } = props;

    const { data: fetchedData } = useFetchProducts(language, params);

    return (
        <>
            {
                fetchedData && fetchedData.length > 0 &&
                <Carousel title={title} options={options}>
                    {
                        fetchedData.map((product: ProductFetched) => {

                            const productCompImages = compImages && compImages[parseInt(product.id)];
                            const staticImagePath = productCompImages && productCompImages.length >= 1 && productCompImages[0];

                            return <ProductThumb data={product} staticImagePath={staticImagePath} key={product.id} />
                        })
                    }
                </Carousel>
            }
        </>
    )
}

export default CarouselWithFetchedProducts;