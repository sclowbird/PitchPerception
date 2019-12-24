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
    <br />
    <div v-if="audioFeatures.length > 0" style="width:40%; margin:0 auto;">
      <b-form-select v-model="selectedAf" :options="allFeatures" size="sm" class="mb-3"></b-form-select>
      <trend
        v-if="selectedAf !== null"
        :data="audioFeatures[selectedAf].value[0]"
        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
        auto-draw
        smooth
      ></trend>
    </div>
    <br />
    <div v-if="averageAf.length > 0" style="width:40%; margin:0 auto;">
      <bars :data="averageAf" :gradient="['#6fa8dc', '#42b983']" :barWidth="40" :growDuration="1"></bars>
    </div>
    <br />
    <br />
    <br />
    <h2>Error? : {{ authenticationError }}</h2>
  </div>
</template>

<script>
import router from "../router";
import {
  dataFilter,
  dataFilterAsync,
  getHashParams,
  round
} from "../utils/utils";
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
      averageAf: [],
      selectedAf: null,
      oAuthToken: "",
      allFeatures: {
        0: "danceability",
        1: "energy",
        2: "speechiness",
        3: "acousticness",
        4: "liveness",
        5: "valence"
      }
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
      let playlistArray = [];

      for (let i = 0; i < playlistIdentifier[0].length; i++) {
        let tempObject = {};
        tempObject["playlistId"] = playlistId[i];
        tempObject["playlistName"] = playlistName[i];
        playlistArray.push(tempObject);
      }

      playlistArray.sort((a, b) => (a.playlistName > b.playlistName ? 1 : -1));
      playlistArray.forEach((element, index) => {
        playlistObject[element.playlistId] = element.playlistName;
      });

      this.playLists = playlistObject;
    },

    // Assigns ids from all tracks of the selected playlist to an array.
    getPlaylistTrackIds: function() {
      this.averageAf = [];
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

      this.audioFeatures = af;

      //create a deep copy of audioFeatures array
      let audioFeaturesCopy = JSON.parse(JSON.stringify(this.audioFeatures));
      this.averageAf = this.displayAverageAudioFeatures(audioFeaturesCopy);
    },

    // Calculate average of all audiofeatures
    displayAverageAudioFeatures: function(af) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      for (let i = 0; i < af.length; i++) {
        length = af[i].value[0].length;
        af[i].value = af[i].value[0].reduce(reducer);
        af[i].value /= length;
        af[i].title += " " + round(af[i].value, 2);
      }
      // Adds Y-Axis to Bar Chart
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
