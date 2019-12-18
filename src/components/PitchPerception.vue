<template>
  <div>
    <b-form-select
      v-model="playlistSelection"
      :options="playLists"
      size="sm"
      class="mb-3"
      v-on:change="getPlaylistTrackIds"
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
      playLists: {},
      oAuthToken: ""
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
        this.oAuthToken = access_token;
        localStorage.removeItem("spotify_auth_state");
        this.getDataFromSpotify(access_token);
      }
    },

    getDataFromSpotify: function() {
      (async () => {
        let user = await ES.getUserData(this.oAuthToken);
        let userPlaylists = await ES.getUserPlaylists(this.oAuthToken, user);
        this.getPlaylistSelection(userPlaylists);
      })();
    },

    getPlaylistSelection: function(userPlaylists) {
      let playlistIdentifier = dataFilter(userPlaylists, "items", "name", "id");
      let playlistName = playlistIdentifier[0];
      let playlistId = playlistIdentifier[1];
      let playlistObject = {};

      playlistId.forEach(
        (element, index) => (playlistObject[element] = playlistName[index])
      );
      this.playLists = playlistObject;
    },

    // Assigns ids from all tracks of the selected playlist to an array.
    getPlaylistTrackIds: function() {
      (async () => {
        let playlistTrackIds = [];
        if (this.playlistSelection !== null) {
          let getTracks = await ES.getPlaylistTracks(
            this.oAuthToken,
            this.playlistSelection
          );
          let trackfilter = dataFilter(getTracks, "items", "track");
          for (let i = 0; i < trackfilter[0].length; i++) {
            playlistTrackIds.push(trackfilter[0][i].id);
          }
          this.getTracksAudioFeatures(playlistTrackIds);
        }
      })();
    },

    getTracksAudioFeatures: function(playlistTrackIds) {
      (async () => {
        let tracks = await playlistTrackIds;
        let audioFeatures = await ES.getAudioFeatures(this.oAuthToken, tracks);
        console.log(audioFeatures);
      })();
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
