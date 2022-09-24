const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
});

server.listen({ port: 3000 }).then(({ url }) => {
    console.log(`Server started on ${url}`);
});
