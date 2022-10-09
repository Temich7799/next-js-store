import React from "react";
import Layout from "../Layout";
import { graphql } from "gatsby";
import ProductPageContent from "../../Content/ProductPageContent";

type Product = {
    name: string
    sku: string
    price: string
    sale_price: string
    description: string
    wordpress_id: number
    id: string
    stock_quantity: number | null
    stock_status: string
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

type ProductProps = {
    data: {
        wcProducts: Product
    }
}

const ProductPageLayout = (props: ProductProps) => {

    const { data } = props;
    const wcProduct = {
        ...data.wcProducts,
        id: data.wcProducts.wordpress_id.toString(),
        image: {
            src: data.wcProducts.images[0].src,
            alt: data.wcProducts.images[0].alt
        }
    }

    const gatsbyImages = new Map<number, string>();

    data.wcProducts.related_products.forEach((relatedProduct: object | any) => {
        if ((relatedProduct.stock_quantity !== null && relatedProduct.stock_quantity > 0) || relatedProduct.stock_status == 'instock') {
            gatsbyImages.set(relatedProduct.wordpress_id, relatedProduct.images[0].localFile.childImageSharp.gatsbyImageData.images.fallback.src);
        }
    });

    return (
        <Layout>
            <main>
                <ProductPageContent data={wcProduct} gatsbyImages={gatsbyImages} />
            </main>
        </Layout >
    )
}

export default ProductPageLayout

export const query = graphql`
  query getProduct($productId: Int!){
    wcProducts(wordpress_id: {eq: $productId}) {
        name
        sku
        price
        sale_price
        description
        wordpress_id
        attributes {
            options
            name
        }
        related_products {
            status
            stock_status
            wordpress_id
            images {
                alt
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            webpOptions: {quality: 85}
                            height: 240
                        )
                    }
                }
            }
            categories {
                slug
            }
        }
        images {
            src
            alt
            localFile {
                childImageSharp {
                    gatsbyImageData(
                        webpOptions: {quality: 85}
                        height: 100
                        width: 100
                        transformOptions: {cropFocus: CENTER}
                    )
                }
            }
        }
        categories {
            slug
        }
    }
}`;

