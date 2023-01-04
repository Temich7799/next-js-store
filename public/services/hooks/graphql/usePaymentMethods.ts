import { ApolloError, gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

type PaymentMethodsQueryResult = {
    data: [any] | undefined
    loading: boolean
    error: ApolloError | undefined
}

export const usePaymentMethods = (language: string = 'ru'): PaymentMethodsQueryResult => {

    const [getWcPaymentMethods, { data, loading, error }] = useLazyQuery(gql`

            query getWcPaymentMethods($language: LanguagesEnum) {
                allWcPaymentMethods(language: $language) {
                    title
                    description
                    enabled
                    id
                }
            }
        `,
        {
            variables: {
                language: language
            }
        });

    useEffect(() => {
        getWcPaymentMethods();
    }, []);

    return {
        data: data ? data.allWcPaymentMethods : data,
        loading: loading,
        error: error
    }
}