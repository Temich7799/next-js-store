import { gql, useLazyQuery } from "@apollo/client";
import Link from 'next/link'
import React, { useContext, useEffect, useState } from "react";
import { PageContext } from "../../Layouts/Layout";
import { SubMenuItem } from "./SubMenuItem";

const CatalogSubMenuItems = () => {

    const { language, langPrefix } = useContext(PageContext);

    const [data, setData] = useState([]);
    const [getItems] = useLazyQuery(gql`query getAllCategoryItems { ru: allWcProductsCategories(params: { hide_empty: true }) { name slug } uk: allWcProductsCategories(language: uk, params: { hide_empty: true }) { name slug } en: allWcProductsCategories(language: en, params: { hide_empty: true }) { name slug } }`);
    useEffect(() => {
        getItems().then(response => {
            setData(response.data[language]);
        });
    }, []);

    return data.length && data.map((item: any, index: number) =>
        <SubMenuItem key={index}>
            <Link href={`/${langPrefix}catalog/${item.slug}`}>
                {item.name}
            </Link>
        </SubMenuItem>
    );
}

export default CatalogSubMenuItems;