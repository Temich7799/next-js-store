import React, { useContext } from "react";
import { useFetchProducts } from "../../services/hooks/graphql/useFetchProducts";
import { PageContext } from "../Layouts/Layout";
import ProductsListPageContent from "./ProductsListPageContent";

const SalePageContent = () => {

    const { language } = useContext(PageContext);

    const { data } = useFetchProducts(language, { on_sale: true });

    return <ProductsListPageContent data={data} />
}

export default SalePageContent;