import { gql } from "@apollo/client";
import { FETCH_WC_PRODUCTS } from "../components/apollo/gql/getAllWcProducts";
import { apolloClient } from "../components/Layouts/Layout";

export async function getServerSidePropsForProductsListPageContent(params: any) {
    const { data: categoryData } = await apolloClient.query({
        query: gql`
          query getCategoryIdBySlug($params: WC_ProductCategoryParams) {
            allWcProductsCategories(params: $params) {
              id
            }
          }
        `,
        variables: {
            params: {
                slug: params.slug
            }
        }
    });

    const categoryId = categoryData.allWcProductsCategories[0].id;

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
        data: data,
        categoryId: categoryId
    };
}