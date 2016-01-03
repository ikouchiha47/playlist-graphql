'use strict';

const BASE_URL = 'http://localhost:3000/graphql';

function status(response) {
  if (response.status >= 200 && response.status < 400) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}

var id = $(".container").dataset.playlistid

$.fetch(`${BASE_URL}/playlists?query={playlist(id: ${id}){title, artist, like_count, tracks{title, url, created_at}}}`)
  .then(status)
  .then(json)
  .then(data => {
    const playlist = data.data.playlist;
    const main = $('main');
    let frag = $.cFrag(playlist.tracks.map(track => {
      return $.cEl('li', {
        children: [
          $.cEl('a', {
            text: track.title,
            attrs: { href: track.url }
          })
        ]
      })
    }));

    $.appendHTML(main, `<span class="likes">${playlist.like_count}</span>`);
    $.append($.cEl('ul', {
      children: [frag],
      classList: ['list-unstyled', 'playlist-info']
    }), main);
  });

function addTrack() {
  const title = $("#add-track");
  const url   = $("#track-url");

  $.fetch(`${BASE_URL}/playlists`, {
    method: 'POST',
    headers: {
      'Content-type': 'text/plain'
    },
    body: `mutation addTrack { addTrack(title: "${title.value}" url: "${url.value}" playlist_id: "${id}") {title, url, created_at} }`
  })
    .then(status)
    .then(json)
    .then(data => {
      const track = data.data.addTrack;
      console.log(track);

      $.append($.cEl('li', {
        children: [
          $.cEl('a', {
            text: track.title,
            attrs: { href: track.url }
          })
        ]
      }), $('ul.playlist-info'))
    })
}

$("button").addEventListener("click", addTrack);
