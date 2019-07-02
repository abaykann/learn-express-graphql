const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')
const server = 'http://localhost:3000'

const LearnType = new GraphQLObjectType({
    name: 'Learn',
    fields: () => ({
      id: { type: GraphQLInt },
      name: { type: GraphQLString },
      status: { type: GraphQLString },
    }),
  })

  // Root Query
  const RootQuery = new GraphQLObjectType({
      name: 'RootQueryType',
  
  fields: {
      learns: {
          type: new GraphQLList(LearnType),
          resolve(_parentValue_, _args_) {
              return axios.get(`${server}/learns/`)
              .then(res=> res.data)
          }
      }
    }
})

const mutation = new GraphQLObjectType ({
    name: 'mutation',
    fields: {
        addLearn: {
         type: LearnType,
         args: {
            name: { type: new GraphQLNonNull(GraphQLString) },
            status: { type: new GraphQLNonNull(GraphQLString)},
         },
         resolvelve(parentValue, args){
             return axios.post(`${server}/learns/`,{
                name: args.name,
                status: args.status,
             }).then(res =>res.data)
         }, 
       },
        findLearn: {
         type: LearnType,
          args: {
           id: { type: GraphQLInt },
        },
        resolve(parentValue, args) {
            return axios.get(`${server}/learns/${args.id}`)
            .then(res => res.data)
        }
      },
      updateLearn: {
        type: LearnType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
          name: { type: GraphQLString },
          status: { type: GraphQLString },
        },
        resolve(parentValue, args) {
          return axios.patch(`${server}/learns/${args.id}`, args)
            .then(res => res.data)
        },
      },
      deleteLearn: {
        type: LearnType,
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) },
        },
        resolve(parentValue, args) {
          return axios.delete(`${server}/learns/${args.id}`, args )
           .then(res => res.data)
        },
      },
    }
  })

  module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
  })
