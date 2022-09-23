
const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config();

const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const port = process.env.PORT;

app.use('/', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});