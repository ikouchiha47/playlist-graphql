var PORT = 3000;
var koa = require("koa");
var json = require("koa-json");
var graphql = require("graphql").graphql;
var model = require("./models/index");

var app = koa();

app.use(json());

app.use(function *(next) {
	if(this.path === '/graphql/users') {
		graphql(model.userSchema, this.query.query).then(res => this.body = res).catch(e => console.log(e));
	} else if(this.path === '/graphql/playlists') {
		graphql(model.playlistSchema, this.query.query).then(res => this.body = res).catch(e => console.log(e));
	}
});

app.listen(PORT, function() {
	console.log("listening on", PORT);
});