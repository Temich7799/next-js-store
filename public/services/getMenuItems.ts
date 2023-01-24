import { gql } from "@apollo/client"
import { apolloClient } from "../components/Layouts/Layout"

export async function getMenuItems(language: string = 'ru') {

  const { data } = await apolloClient.query({
    query: gql`
          query getMenuItems($language: LanguagesEnum) {
            headerMenuItems: allWpMenuItems(slug: "header", language: $language) { url title slug child_items { url title } }
            footerMenuItems: allWpMenuItems(slug: "footer", language: $language) { slug title child_items { slug title } }
          }
        `,
    variables: {
      language: language
    }
  });

  return {
    menuItems: data
  };
}