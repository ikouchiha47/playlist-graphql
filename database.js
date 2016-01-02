var playlists = require("./data/playlists.json");
var tracks = require("./data/tracks.json");

function PlayList(playlist) {
	this.id = playlist.id;
	this.title = playlist.title;
	this.artist = playlist.artist;
	this.likeCount = playlist.like_count;
	this.createdAt = playlist.created_at;
	
	if(playlist.tracks) this.tracks = playlist.tracks.map(t => new Track(t));
}

PlayList.prototype.toJSON = function() {
	return JSON.stringify({
		id: this.id,
		title: this.title,
		artist: this.artist,
		like_count: this.likeCount,
		created_at: this.createdAt,
		tracks: (this.tracks ? this.tracks : [])
	})
}

function Track(track) {
	this.id = track.id;
	this.playlistId = track.playlist_id;
	this.title = track.title;
	this.url = track.url;
	this.createdAt = track.created_at;
}

Track.prototype.toJSON = function () {
	return JSON.stringify({
		id: this.id,
		playlist_id: this.playlistId,
		title: this.title,
		url: this.url,
		created_at: this.createdAt
	})
}

var db = {
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