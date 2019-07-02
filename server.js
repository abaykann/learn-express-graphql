

const express = require('express');
const expressGraphQL = require('express-graphql');
//expressGraphQL dengan tampilan GUI menggunakan model dari file schema.js
const schema = require('./schema.js');
const app = express();

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true,
}))



app.listen(4000, () => {
    console.log(`Server ready at http://localhost:4000`)

})

