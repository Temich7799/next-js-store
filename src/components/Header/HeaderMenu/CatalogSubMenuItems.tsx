import { graphql, Link, useStaticQuery } from "gatsby";
import React, { useContext } from "react";
import { LangContext } from "../../Layouts/Layout";
import { SubMenuItem } from "./SubMenuItem";

const CatalogSubMenuItems = () => {

    const { language, langPrefix } = useContext(LangContext);

    const data = useStaticQuery(graphql`
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
    `);

    return data[language].map((item: any, index: number) =>
        <SubMenuItem key={index}>
            <Link to={`/${langPrefix}catalog/${item.slug}`}>
                {item.name}
            </Link>
        </SubMenuItem>
    );
}

export default CatalogSubMenuItems;