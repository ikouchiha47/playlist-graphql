var gql  = require("graphql");

var Track = new gql.GraphQLObjectType({
  name: 'Track',
  fields: () => ({
    id: { type: gql.GraphQLID },
    playlist_id: { type: gql.GraphQLID },
    title: { type: gql.GraphQLString },
    url: { type: gql.GraphQLString },
    created_at: { type: gql.GraphQLString }
  })
});

module.exports = Track;
