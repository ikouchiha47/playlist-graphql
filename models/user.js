var gql  = require("graphql");

var User = new gql.GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: gql.GraphQLID },
    first_name: { type: gql.GraphQLString },
    last_name: { type: gql.GraphQLString },
    full_name: { type: gql.GraphQLString },
    email: { type: gql.GraphQLString },
    gender: { type: gql.GraphQLString }
  })
});

var UserSchema = new gql.GraphQLSchema({
  query: new gql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: User,
        args: {
          id: { type: gql.GraphQLID }
        },
        resolve: ({db}, {id}) => db.getUser(id)
      }
    }
  })
});

module.exports = UserSchema;
