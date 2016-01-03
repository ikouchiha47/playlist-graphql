var PORT = 3000;
var koa = require("koa");
var graphql = require("graphql").graphql;
var db = require("./database");
var model = require("./models/index");
var views = require("co-views");
var parse = require('co-body');
var render = views(__dirname + '/views', { map: { html: 'swig' } });
var app = koa();

app.use(require("koa-static")(__dirname + "/public/"));
app.use(require("koa-json")());

app.use(function *(next) {
	if(this.path === '/playlists') {
		this.body = yield db.getPlayLists();
	} else if(/\/playlists\/\d+/.test(this.path)) {
		var match = this.path.match(/\/playlists\/(\d+)/);
		if(!match) return yield next;

		var pl = db.getPlayList(match[1]);
		this.body = yield render("playlist", { title: pl.title, artist: pl.artist, id: pl.id });
	} else if(this.path === '/graphql/users') {
		this.body = yield graphql(model.userSchema, this.query.query, { db })
	} else if(this.path === '/graphql/playlists') {
    if(this.method.toLowerCase() == "get")
		  this.body = yield graphql(model.playlistSchema, this.query.query, { db })
    else if(this.method.toLowerCase() == "post") {
      var body = yield parse.text(this, { limit: '1kb' });
      console.log(body);
      this.body = yield graphql(model.playlistSchema, body, { db });
    }
	} else {
		this.body = yield render('index');
	}
});

app.listen(PORT, function() {
	console.log("listening on", PORT);
});
