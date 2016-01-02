var gql  = require("graphql");
var db = require("../database");

var Track = require("./track");

var PlayList = new gql.GraphQLObjectType({
	name: 'PlayList',
	fields: () => ({
		id: { type: gql.GraphQLID },
		title: { type: gql.GraphQLString },
		artist: { type: gql.GraphQLString },
		like_count: { type: gql.GraphQLInt },
		created_at: { type: gql.GraphQLString },
		tracks: {	type: new gql.GraphQLList(Track) }
	})
});

var PlayListSchema = new gql.GraphQLSchema({
	query: new gql.GraphQLObjectType({
		name: 'Query',
		fields: {
			playlist: {
				type: PlayList,
				args: {	id: { type: gql.GraphQLID }	},
				resolve: (_, args) => db.getPlayListWithTracks(args.id)
			}
		}
	})
});

module.exports = PlayListSchema;