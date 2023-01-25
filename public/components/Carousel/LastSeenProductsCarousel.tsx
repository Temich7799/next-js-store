import React, { useContext } from "react";
import { PageContext } from "../../templates/BaseTemplate";
import Carousel from "./Carousel";
import { useLastSeenProductsVar } from "../../services/hooks/apollo_vars/useLastSeenProductsVar";
import { ProductFetched } from "../../interfaces/InterfaceProduct";
import ProductThumb from "../Product/Thumbs/ProductThumb";
import { CarouselOptions } from "../../types/CarouselPropsType";

const LastSeenProductsCarousel = (props: CarouselOptions) => {

    const { language } = useContext(PageContext);
    const { CAROUSEL_LAST_SEEN_PRODUCTS_TITLE } = require(`../../languages/${language}/languages`);

    const { data } = useLastSeenProductsVar();
    const products: Array<ProductFetched> = Object.values(data);

    return (
        <>
            {
                products && products.length > 0 && <Carousel title={CAROUSEL_LAST_SEEN_PRODUCTS_TITLE} options={props}>
                    {
                        products.map((product: ProductFetched) => <ProductThumb data={product} key={product.id} />)
                    }
                </Carousel >
            }
        </>
    )
}

export default LastSeenProductsCarousel;