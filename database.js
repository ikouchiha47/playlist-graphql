var playlists = require("./data/playlists.json");
var tracks = require("./data/tracks.json");
var users = require("./data/users.json");

function PlayList(playlist) {
	this.id = playlist.id;
	this.title = playlist.title;
	this.artist = playlist.artist;
	this.like_count = playlist.like_count;
	this.created_at = playlist.created_at;
	
	if(playlist.tracks) this.tracks = playlist.tracks.map(t => new Track(t));
}

PlayList.prototype.toJSON = function() {
	return JSON.stringify({
		id: this.id,
		title: this.title,
		artist: this.artist,
		like_count: this.like_count,
		created_at: this.created_at,
		tracks: (this.tracks ? this.tracks : [])
	})
}

function Track(track) {
	this.id = track.id;
	this.playlist_id = track.playlist_id;
	this.title = track.title;
	this.url = track.url;
	this.created_at = track.created_at;
}

Track.prototype.toJSON = function () {
	return JSON.stringify({
		id: this.id,
		playlist_id: this.playlist_id,
		title: this.title,
		url: this.url,
		created_at: this.created_at
	})
}


function User(user) {
	this.id = user.id;
	this.first_name = user.first_name;
	this.last_name = user.last_name;
	this.email = user.email;
	this.gender = user.gender;
	
	this.full_name = `${user.first_name} ${user.last_name}`
}

User.prototype.toJSON = function() {
	return JSON.stringify({
		id: this.id,
		first_name: this.firstName,
		last_name: this.lastName,
		email: this.email,
		gender: this.gender
	})
}

var db = {
	getUser: (id) => {
		var user = users.find(u => u.id == id);
		if(user) return new User(user);
		
		return {};
	},
	
	getPlayList: (id) => {
		var playlist = playlists.find(p => p.id == id);
		if(playlist) return new PlayList(playlist);

		return {};
	},
	
	getTracks: (id) => {
		var track = tracks.find(t => t.id == id);
		if(track) return new Track(track);

		return {};
	},
	
	getPlayListWithTracks: (playlistId) => {
		var playlist = db.getPlayList(playlistId);
		
		if(playlist) {
			playlist.tracks = tracks.filter(t => t.playlist_id == playlistId);
			return new PlayList(playlist);
		}
		
		return {};
	}
}

module.exports = db;