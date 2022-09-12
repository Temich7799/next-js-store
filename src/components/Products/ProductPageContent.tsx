import React from "react";
import styled from "styled-components";
import ProductAbout from "./ProductAbout/ProductAbout";
import ProductDescription from "./ProductDescription";
import ProductGallery from "./ProductGallery/ProductGallery";

type ProductPageContentProps = {
    data: Product
    gatsbyImages: Map<number, string>
}

type Product = {
    name: string
    slug: string
    sku: string
    price: string
    sale_price: string
    description: string
    wordpress_id: number
    stock_quantity?: number | null
    stock_status?: string
    related_products: [Product]
    attributes: [
        {
            options: [string]
            name: string
        }
    ]
    images: [
        {
            src: string
            alt: string
            localFile: object | any
        }
    ]
    image: {
        src: string
        alt: string
    }
    categories: [
        {
            slug: string
        }
    ]
}

const StyledProductsPageContent = styled.div`
    max-width: 1900px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 25px;
    padding: 5%;
`;

const ProductPageContent = (props: ProductPageContentProps) => {

    const { data, gatsbyImages } = props;

    return (
        <StyledProductsPageContent>
            <ProductGallery data={data.images}></ProductGallery>
            <ProductAbout data={data}></ProductAbout>
            <ProductDescription data={data.description}></ProductDescription>
            {
                /*
                data.related_products.length
                    ?
                    <Carousel title={CAROUSEL_RELATED_PRODUCTS_TITLE} carouselItemMax={3}>
                        {
                            data.related_products.map((relatedProduct: Product) =>
                                <ProductThumb
                                    data={relatedProduct}
                                    absolutePath={`${document.location.origin}/catalog/${relatedProduct.categories[0].slug}/${relatedProduct.categories[0].slug}-${relatedProduct.sku != '' ? relatedProduct.sku : relatedProduct.wordpress_id}`}
                                    key={relatedProduct.wordpress_id}
                                />
                            )
                        }
                    </Carousel>
                    : <></>
                    */
            }
        </StyledProductsPageContent>
    )
}

export default ProductPageContent;