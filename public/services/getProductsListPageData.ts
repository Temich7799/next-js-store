import { gql } from "@apollo/client";
import { FETCH_WC_PRODUCTS } from "../apollo/gql/getAllWcProducts";
import { apolloClient } from "../templates/BaseTemplate";

export async function getProductsListPageData(pageSlug: string) {

    const { data: categoryData } = await apolloClient.query({
        query: gql`
          query getCategoryIdBySlug($params: WC_ProductCategoryParams) {
            allWcProductsCategories(params: $params) {
              id
              yoast_head_json {
                title
                description
                og_title
                og_type
                og_locale
                og_site_name
                og_description
              }
            }
          }
        `,
        variables: {
            params: {
                slug: pageSlug
            }
        }
    });

    const categoryId = categoryData.allWcProductsCategories[0].id;
    const categoryMetaData = categoryData.allWcProductsCategories[0].yoast_head_json;

    const { data } = await apolloClient.query({
        query: FETCH_WC_PRODUCTS,
        variables: {
            params: {
                category: categoryId,
                stock_status: 'instock',
                status: 'publish',
                per_page: 25,
                offset: 0
            }
        }
    })

    return {
        data: data.allWcProducts,
        metaData: categoryMetaData,
        categoryId: categoryId
    };
}