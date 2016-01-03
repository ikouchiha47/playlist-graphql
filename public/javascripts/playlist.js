'use strict';

const BASE_URL = 'http://localhost:3000';

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

$.fetch(`${BASE_URL}/playlists`)
  .then(status)
  .then(json)
  .then(data => {
    var frag = $.cFrag(data.map(d => {
      d = JSON.parse(d);
      return $.cEl('li', {
        children: [
          $.cEl('a', {
            attrs: { href: `${BASE_URL}/playlists/${d.id}` },
            text: `${d.title} by ${d.artist}`,
          })
        ]
      })
    }))

    $.append($.cEl('ul', {
      children: [frag],
      classList: ['list-unstyled'],
      attrs: { id: "playlists" }
    }), $("main"));
  })
//`${BASE_URL}/graphql/playlists?query={playlist(id: ${d.id}){title, artist, like_count, tracks{title, url}}}`
