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
      <b-form-select
        v-model="selectedAf"
        :options="featureDropDown"
        size="sm"
        class="mb-3"
        v-on:change="getMinMaxValue"
      >
        <template v-slot:first>
          <option :value="null" disabled>Please select an audio feature</option>
        </template>
      </b-form-select>
      <div v-if="selectedAf !== null">
        <p>minimum value: {{ selectedAfMinValue }}, maximum value: {{ selectedAfMaxValue }}</p>
        <trend
          :data="audioFeatures[selectedAf].value[0]"
          :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
          auto-draw
          smooth
        ></trend>
      </div>
    </div>
    <br />
    <div v-if="averageAf.length > 0">
      <p>Average audio features</p>
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
      selectedAf: null,
      selectedAfMinValue: 0,
      selectedAfMaxValue: 0
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
      // all available audio features are defined in audioFeatureObjects.js
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
      this.selectedAfMinValue = this.featureMinValue();
      this.selectedAfMaxValue = this.featureMaxValue();
    },

    // Calculate average of all audiofeatures and provide neccessary data for bar charts
    displayAverageAudioFeatures: function() {
      // Calculate the average value of all given audio features
      let calcAverage = this.calculateAverage();

      // Add Y-Axis to Bar Chart visualization with a maximum value of 1
      const Y_AXIS_MAX_VALUE = 1;
      calcAverage.unshift({
        value: [Y_AXIS_MAX_VALUE],
        title: "Y-Max-Value = 1"
      });

      // provide data needed for visualization of bar chart
      this.averageAf = calcAverage;
    },

    calculateAverage: function() {
      // create a deep copy of audioFeatures array
      let copyAf = JSON.parse(JSON.stringify(this.audioFeatures));

      // the here selected features are displayed in the bar chart of the app
      // calculate average features for: danceability (0) , energy (1), speechiness (2), acousticness (3), liveness (4), valence (5)
      const SELECTED_AUDIOFEATURES = 6;
      let selectAverageAf = [];
      for (let i = 0; i < SELECTED_AUDIOFEATURES; i++) {
        selectAverageAf.push(copyAf[i]);
      }

      // calculate the average for every audio feature
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      for (let i = 0; i < selectAverageAf.length; i++) {
        length = selectAverageAf[i].value[0].length;
        selectAverageAf[i].value =
          selectAverageAf[i].value[0].reduce(reducer) / length;
        selectAverageAf[i].title += " " + round(selectAverageAf[i].value, 2);
      }

      return selectAverageAf;
    },

    getMinMaxValue: function() {
      let minValue = this.featureMinValue();
      let maxValue = this.featureMaxValue();
    },

    featureMinValue: function() {
      if (this.selectedAf !== null) {
        let minVal = Math.min(...this.audioFeatures[this.selectedAf].value[0]);
        this.selectedAfMinValue = round(minVal, 2);
      } else {
        this.selectedAfMinValue = " :minimum value couldn't be identified.";
      }
    },

    featureMaxValue: function() {
      if (this.selectedAf !== null) {
        let maxVal = Math.max(...this.audioFeatures[this.selectedAf].value[0]);
        this.selectedAfMaxValue = round(maxVal, 2);
      } else {
        this.selectedAfMaxValue = " :maximum value couldn't be identified.";
      }
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
