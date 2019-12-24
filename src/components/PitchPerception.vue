<template>
  <div style="width:70%; margin:0 auto;">
    <b-form-select
      v-model="playlistSelection"
      :options="playLists"
      size="sm"
      class="mb-3"
      v-on:change="getPlaylistTrackIds"
    >
      <template v-slot:first>
        <option :value="null" disabled>Please select a playlist</option>
      </template>
    </b-form-select>
    <br />
    <div v-if="audioFeatures.length > 0">
      <b-form-select v-model="selectedAf" :options="featureDropDown" size="sm" class="mb-3">
        <template v-slot:first>
          <option :value="null" disabled>Please select an audio feature</option>
        </template>
      </b-form-select>
      <trend
        v-if="selectedAf !== null"
        :data="audioFeatures[selectedAf].value[0]"
        :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
        auto-draw
        smooth
      ></trend>
    </div>
    <br />
    <div v-if="averageAf.length > 0">
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
import { dataFilter, getHashParams, round } from "../utils/utils";
import {
  featureSelection,
  availableAudioFeatures
} from "../utils/audioFeatureObjects";
import * as ES from "../services/EventService";
export default {
  name: "PitchPerception",
  data() {
    return {
      oAuthToken: "",
      authenticationError: "",
      playLists: {},
      playListTracks: {},
      playlistSelection: null,
      audioFeatures: [],
      featureDropDown: featureSelection,
      averageAf: [],
      selectedAf: null
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
      let af = availableAudioFeatures;
      for (let i = 0; i < af.length; i++) {
        af[i].value = dataFilter(
          tracksAudioFeatures,
          "audio_features",
          af[i].title
        );
      }

      this.audioFeatures = af;
      this.displayAverageAudioFeatures();
    },

    // Calculate average of all audiofeatures and provide neccessary data for bar charts
    displayAverageAudioFeatures: function() {
      // create a deep copy of audioFeatures array
      let copyAf = JSON.parse(JSON.stringify(this.audioFeatures));

      // display average features for: danceability, energy, speechiness, acousticness, liveness, valence
      let displayAverageAf = [];
      for (let i = 0; i < 6; i++) {
        displayAverageAf.push(copyAf[i]);
      }

      // calculate the average for every audio feature
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      for (let i = 0; i < displayAverageAf.length; i++) {
        length = displayAverageAf[i].value[0].length;
        displayAverageAf[i].value =
          displayAverageAf[i].value[0].reduce(reducer) / length;
        displayAverageAf[i].title += " " + round(displayAverageAf[i].value, 2);
      }

      // Adds Y-Axis to Bar Chart
      displayAverageAf.unshift({ value: [1], title: "Y-Max-Value = 1" });

      // provide data needed for visualization of bar chart
      this.averageAf = displayAverageAf;
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
