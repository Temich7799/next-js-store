import React, { useContext } from "react";
import { useProductsQuery } from "../../services/hooks/graphql/useProductsQuery";
import useActualDate from "../../services/hooks/useActualDate";
import { LangContext } from "../Layouts/Layout";
import ProductsListPageContent from "./ProductsListPageContent";

const NewArrivalsPageContent = () => {

    const { language } = useContext(LangContext);

    const date = useActualDate();
    const { data } = useProductsQuery(language, { after: date });

    return <ProductsListPageContent data={data} />
}

export default NewArrivalsPageContent;