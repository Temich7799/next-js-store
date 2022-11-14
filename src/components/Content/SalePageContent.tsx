import React, { useContext } from "react";
import { useProductsQuery } from "../../services/hooks/graphql/useProductsQuery";
import { LangContext } from "../Layouts/Layout";
import ProductsListPageContent from "./ProductsListPageContent";

const SalePageContent = () => {

    const { language } = useContext(LangContext);

    const { data } = useProductsQuery(language, { on_sale: true });

    return <ProductsListPageContent data={data} />
}

export default SalePageContent;