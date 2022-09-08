
const express = require('express');
const app = express();
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const port = 3000;

app.use(cors({ origin: true, credentials: true }));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
}));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})