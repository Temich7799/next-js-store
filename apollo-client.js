import { ApolloClient, InMemoryCache } from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";

const client = new ApolloClient({
    link: new BatchHttpLink({
        uri: 'https://server.malinikids.com/',
        batchMax: 5,
        batchInterval: 25
    }),
    cache: new InMemoryCache(
        {
            typePolicies: {
                Query: {
                    fields: {
                        allWcProducts: {
                            keyArgs: ["params", ["category", "include", "after", "on_sale"]],
                            merge(existing = [], incoming) {
                                return [...existing, ...incoming]
                            }
                        },
                    },
                },
            },
        }
    ),
});

export default client;