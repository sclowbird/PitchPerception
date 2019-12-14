<template>
  <div>
    <h2>Error? : {{ authenticationError }}</h2>
    <br />
    <br />
    <h4>Playlists: {{ playLists }}</h4>
    <br />
    <br />
    <h4>PlaylistTRACKSLOL1: {{ playListTracks }}</h4>
  </div>
</template>

<script>
import router from "../router";
import { initRequest, dataFilter } from "../utils/utils";
export default {
  name: "PitchPerception",
  data() {
    return {
      authenticationError: "",
      playListTracks: {},
      playLists: ""
    };
  },
  created: function() {
    let params = this.getHashParams();
    this.getAuthToken(params);
  },
  methods: {
    getHashParams: function() {
      var hashParams = {};
      var e,
        r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(2);
      while ((e = r.exec(q))) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
      }
      return hashParams;
    },

    getAuthToken: function(params) {
      let access_token = params.access_token,
        state = params.state,
        storedState = localStorage.getItem("spotify_auth_state");
      if (access_token && (state == null || state !== storedState)) {
        this.authenticationError = "There was an error during authentication.";
      } else {
        localStorage.removeItem("spotify_auth_state");
        this.initiateApiRequests(access_token);
      }
    },

    initiateApiRequests: function(accessToken) {
      //this.getPlaylistTracks(accessToken, "3e7iOeG4lfW7AuMShGB9Gb");
      //this.getUserPlaylists(accessToken, "sclowbird");
      (async () => {
        let user = await this.getUserData(accessToken);
        let userPlaylists = await this.getUserPlaylists(accessToken, user);
        let playlistIds = dataFilter(userPlaylists, "items", "name");
        this.playLists = playlistIds[0];
      })();
    },

    getUserData: function(accessToken) {
      const url = "https://api.spotify.com/v1/me";
      async function res() {
        let response = await initRequest(accessToken, url);
        return response.id;
      }
      return res();
    },

    getUserPlaylists: function(accessToken, userId) {
      let url = `https://api.spotify.com/v1/users/${userId}/playlists`;
      async function res() {
        let response = await initRequest(accessToken, url);
        return response;
      }
      return res();
    },

    getPlaylistTracks: function(accessToken, playlistId) {
      const fields = "items(track(id,name,href,artists))";
      let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
      url += "?fields=" + encodeURIComponent(fields);
      async function res() {
        let response = await initRequest(accessToken, url);
        return response;
      }
      return res();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
