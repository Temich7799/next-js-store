import React from "react"
import Layout, { apolloClient } from "../../public/components/Layouts/Layout";
import ProductPageContent from '../../public/components/Content/ProductPageContent';
import { gql } from "@apollo/client";

const ProductPage = ({ productPageData }) => {

    return (
        <Layout>
            <ProductPageContent data={productPageData} />
        </Layout>
    )
}

export default ProductPage;

export async function getServerSideProps(context: any) {

    const { data } = await apolloClient.query({
        query: gql`
            query getProductData($language: LanguagesEnum, $params: WC_ProductParams) {
                allWcProducts(language: $language, params: $params) {
                    name
                    sku
                    price
                    sale_price
                    stock_quantity
                    stock_status
                    status
                    description
                    related_ids
                    id
                    attributes {
                        options
                        name
                    }
                    images {
                        alt
                        src
                    }
                    categories {
                        slug
                    }
                    yoast_head_json {
                        title
                        description
                        og_title
                        og_type
                        og_locale
                        og_url
                        og_site_name
                        og_description
                    }
                }
            }
        `,
        variables: {
            language: 'uk',
            params: {
                per_page: 1,
                slug: context.params.productSlug
            }
        }
    });

    return {
        props: {
            productPageData: data.allWcProducts[0]
        }
    }
}