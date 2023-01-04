import { gql } from "@apollo/client";
import client from "../../../../apollo-client";
import Link from 'next/link'
import React, { useContext } from "react";
import { LangContext } from "../../Layouts/Layout";
import { SubMenuItem } from "./SubMenuItem";

const CatalogSubMenuItems = ({ allCategoryItems }) => {

    const { language, langPrefix } = useContext(LangContext);

    const data = allCategoryItems;

    return data[language].map((item: any, index: number) =>
        <SubMenuItem key={index}>
            <Link href={`/${langPrefix}catalog/${item.slug}`}>
                {item.name}
            </Link>
        </SubMenuItem>
    );
}

export default CatalogSubMenuItems;

export async function getStaticProps() {

    const { data } = await client.query({
        query: gql`
        query getAllCategoryItems {
            ru: allMultilangWcCategories(params: {hide_empty: true}) {
                name
                slug
            }
            uk: allMultilangWcCategories(language: uk, params: {hide_empty: true}) {
                name
                slug
            }
            en: allMultilangWcCategories(language: en, params: {hide_empty: true}) {
                name
                slug
            }
        }
      `,
    });

    return {
        props: {
            allCategoryItems: data,
        },
    };
}