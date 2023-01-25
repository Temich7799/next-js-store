import React, { useContext } from "react";
import { useFetchProducts } from "../services/hooks/graphql/useFetchProducts";
import { PageContext } from "./BaseTemplate";
import ProductsListPageTemplate from "./ProductsListPageTemplate";

const SalePageTemplate = () => {

    const { language } = useContext(PageContext);

    const { data } = useFetchProducts(language, { on_sale: true });

    return <ProductsListPageTemplate data={data} />
}

export default SalePageTemplate;