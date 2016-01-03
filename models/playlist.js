var gql  = require("graphql");
var Track = require("./track");

var PlayList = new gql.GraphQLObjectType({
  name: 'PlayList',
  fields: () => ({
    id: { type: gql.GraphQLID },
    title: { type: gql.GraphQLString },
    artist: { type: gql.GraphQLString },
    like_count: { type: gql.GraphQLInt },
    created_at: { type: gql.GraphQLString },
    tracks: { type: new gql.GraphQLList(Track) }
  })
});

var PlayListSchema = new gql.GraphQLSchema({
  query: new gql.GraphQLObjectType({
    name: 'Query',
    fields: {
      playlist: {
        type: PlayList,
        args: { id: { type: gql.GraphQLID } },
        resolve: ({db}, {id}) => db.getPlayListWithTracks(id)
      }
    }
  }),

  mutation: new gql.GraphQLObjectType({
    name: 'Mutation',
    fields: {
      addTrack: {
        type: Track,
        args: {
          playlist_id: { type: new gql.GraphQLNotNull(gql.GraphQLID) },
          title: { type:  new gql.GraphQLNotNull(gql.GraphQLString) },
          url: { type:  new gql.GraphQLNotNull(gql.GraphQLString) }
        },
        resolve: ({db}, {playlist_id, title, url}) => db.createTrack(playlist_id, title, url)
      }
    }
  })
});

module.exports = PlayListSchema;
