<template>
  <div>
    <b-form-select
      style="width:40%; margin:0 auto;"
      v-model="playlistSelection"
      :options="playLists"
      size="sm"
      class="mb-3"
      v-on:change="getPlaylistTrackIds"
    ></b-form-select>

    <span>Selected playlist: {{ playlistSelection }}</span>
    <br />
    <div v-if="audioFeatures.length > 0" style="width:40%; margin:0 auto;">
      <bars
        :data="audioFeatures"
        :gradient="['#6fa8dc', '#42b983']"
        :barWidth="50"
        :growDuration="1"
      >
      </bars>
    </div>
    <h5>audioFeatures? : {{ audioFeatures }}</h5>
    <br />
    <h2>Error? : {{ authenticationError }}</h2>
  </div>
</template>

<script>
import router from "../router";
import { dataFilter, getHashParams, round } from "../utils/utils";
import * as ES from "../services/EventService";
export default {
  name: "PitchPerception",
  data() {
    return {
      authenticationError: "",
      playListTracks: {},
      playlistSelection: null,
      playLists: {},
      audioFeatures: [],
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
      playlistName.sort();
      playlistId.forEach(
        (element, index) => (playlistObject[element] = playlistName[index])
      );
      this.playLists = playlistObject;
    },

    // Assigns ids from all tracks of the selected playlist to an array.
    getPlaylistTrackIds: function() {
      this.audioFeatures = [];
      (async () => {
        let playlistTrackIds = [];
        if (this.playlistSelection !== null) {
          let getTracks = await ES.getPlaylistTracks(
            this.oAuthToken,
            this.playlistSelection
          );
          let trackfilter = dataFilter(getTracks, "items", "track");
          for (let i = 0; i < trackfilter[0].length; i++) {
            if (trackfilter[0][i] !== null) {
              playlistTrackIds.push(trackfilter[0][i].id);
            } else {
              continue;
            }
          }
          this.getTracksAudioFeatures(playlistTrackIds);
        }
      })();
    },

    getTracksAudioFeatures: function(playlistTrackIds) {
      (async () => {
        let tracks = await playlistTrackIds;
        let tracksAudioFeatures = await ES.getAudioFeatures(
          this.oAuthToken,
          tracks
        );

        this.playlistAudioFeatures(tracksAudioFeatures);
      })();
    },

    playlistAudioFeatures: function(tracksAudioFeatures) {
      let af = [
        { value: [], title: "danceability" },
        { value: [], title: "energy" },
        { value: [], title: "speechiness" },
        { value: [], title: "acousticness" },
        { value: [], title: "liveness" },
        { value: [], title: "valence" }
      ];

      for (let i = 0; i < af.length; i++) {
        af[i].value = dataFilter(
          tracksAudioFeatures,
          "audio_features",
          af[i].title
        );
      }

      this.audioFeatures = this.averageAudioFeatures(af);
    },

    // Calculate average of all audiofeatures
    // so it is represented in the following format
    // audiofeature (string) : averagevalue (float)
    // eg: "energy" : 0.871
    averageAudioFeatures: function(af) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;

      for (let i = 0; i < af.length; i++) {
        length = af[i].value[0].length;
        af[i].value = af[i].value[0].reduce(reducer);
        af[i].value /= length;
        af[i].title += " " + round(af[i].value, 2);
      }

      af.unshift({ value: [1], title: "Y-Max-Value = 1" });
      return af;
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
