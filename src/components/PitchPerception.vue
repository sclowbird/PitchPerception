<template>
  <div>
    <b-dropdown
      id="playlist-selection"
      variant="primary"
      text="Choose playlist"
      class="m-2"
    >
      <div v-for="(item, index) in playLists[0]" :key="index">
        <b-dropdown-item href="#"> {{ item }}</b-dropdown-item>
      </div>
    </b-dropdown>

    <b-form-select
      v-model="playlistSelection"
      :options="playLists"
      size="sm"
      class="mt-3"
    ></b-form-select>

    <span> Selected playlist: {{ playlistSelection }}</span>

    <br />
    <br />
    <h2>Error? : {{ authenticationError }}</h2>
  </div>
</template>

<script>
import router from "../router";
import { dataFilter, getHashParams } from "../utils/utils";
import * as ES from "../services/EventService";
export default {
  name: "PitchPerception",
  data() {
    return {
      authenticationError: "",
      playListTracks: {},
      playlistSelection: null,
      playLists: {}
    };
  },
  created: function() {
    let params = getHashParams();
    this.getAuthToken(params);
  },
  methods: {
    getAuthToken: function(params) {
      let access_token = params.access_token,
        state = params.state,
        storedState = localStorage.getItem("spotify_auth_state");
      if (access_token && (state == null || state !== storedState)) {
        this.authenticationError = "There was an error during authentication.";
      } else {
        localStorage.removeItem("spotify_auth_state");
        this.getDataFromSpotify(access_token);
      }
    },

    getDataFromSpotify: function(accessToken) {
      //this.getPlaylistTracks(accessToken, "3e7iOeG4lfW7AuMShGB9Gb");
      //this.getUserPlaylists(accessToken, "sclowbird");
      (async () => {
        let user = await ES.getUserData(accessToken);
        let userPlaylists = await ES.getUserPlaylists(accessToken, user);
        this.displayUserPlaylists(userPlaylists);
      })();
    },

    displayUserPlaylists: function(userPlaylists) {
      let playlistIdentifier = dataFilter(userPlaylists, "items", "name", "id");
      let playlistName = playlistIdentifier[0];
      let playlistId = playlistIdentifier[1];
      let playlistObject = {};
      playlistId.forEach(
        (element, index) => (playlistObject[element] = playlistName[index])
      );
      this.playLists = playlistObject;
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
