import React, { useContext } from "react";
import { useFetchProducts } from "../../services/hooks/graphql/useFetchProducts";
import useActualDate from "../../services/hooks/useActualDate";
import { LangContext } from "../Layouts/Layout";
import ProductsListPageContent from "./ProductsListPageContent";

const NewArrivalsPageContent = () => {

    const { language } = useContext(LangContext);

    const date = useActualDate();
    const { data } = useFetchProducts(language, { after: date });

    return <ProductsListPageContent data={data} />
}

export default NewArrivalsPageContent;