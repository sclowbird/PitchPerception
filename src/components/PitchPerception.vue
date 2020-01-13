<template>
  <div id="container">
    <div id="playlistDropDown">
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
    </div>
    <div id="audioFeatureDropDown" v-if="audioFeatures.length > 0">
      <b-form-select v-model="selectedAf" :options="featureDropDown" size="sm" class="mb-3">
        <template v-slot:first>
          <option :value="null" disabled>Please select an audio feature</option>
        </template>
      </b-form-select>
      <div id="trend-diagram-container" v-if="selectedAf !== null">
        <div id="description" v-if="featureDropDown[selectedAf] != 'duration'">
          <b-button v-b-modal.modal-1>What does {{ featureDropDown[selectedAf] }} mean?</b-button>
          <b-modal hide-footer id="modal-1" :title="featureDropDown[selectedAf]">
            <div id="danceability" v-if="featureDropDown[selectedAf] == 'danceability'">
              <p class="my-4">
                Danceability describes how suitable a track is for dancing based
                on a combination of musical elements including tempo, rhythm
                stability, beat strength, and overall regularity. A value of 0.0
                is least danceable and 1.0 is most danceable.
              </p>
            </div>
            <div id="energy" v-if="featureDropDown[selectedAf] == 'energy'">
              <p class="my-4">
                Energy is a measure from 0.0 to 1.0 and represents a perceptual
                measure of intensity and activity. Typically, energetic tracks
                feel fast, loud, and noisy. For example, death metal has high
                energy, while a Bach prelude scores low on the scale. Perceptual
                features contributing to this attribute include dynamic range,
                perceived loudness, timbre, onset rate, and general entropy.
              </p>
            </div>
            <div id="speechiness" v-if="featureDropDown[selectedAf] == 'speechiness'">
              <p class="my-4">
                Speechiness detects the presence of spoken words in a track. The
                more exclusively speech-like the recording (e.g. talk show,
                audio book, poetry), the closer to 1.0 the attribute value.
                Values above 0.66 describe tracks that are probably made
                entirely of spoken words. Values between 0.33 and 0.66 describe
                tracks that may contain both music and speech, either in
                sections or layered, including such cases as rap music. Values
                below 0.33 most likely represent music and other non-speech-like
                tracks.
              </p>
            </div>
            <div id="acousticness" v-if="featureDropDown[selectedAf] == 'acousticness'">
              <p class="my-4">
                A confidence measure from 0.0 to 1.0 of whether the track is
                acoustic. 1.0 represents high confidence the track is acoustic.
              </p>
            </div>
            <div id="liveness" v-if="featureDropDown[selectedAf] == 'liveness'">
              <p class="my-4">
                Detects the presence of an audience in the recording. Higher
                liveness values represent an increased probability that the
                track was performed live. A value above 0.8 provides strong
                likelihood that the track is live.
              </p>
            </div>
            <div id="valence" v-if="featureDropDown[selectedAf] == 'valence'">
              <p class="my-4">
                A measure from 0.0 to 1.0 describing the musical positiveness
                conveyed by a track. Tracks with high valence sound more
                positive (e.g. happy, cheerful, euphoric), while tracks with low
                valence sound more negative (e.g. sad, depressed, angry).
              </p>
            </div>
            <div id="instrumentalness" v-if="featureDropDown[selectedAf] == 'instrumentalness'">
              <p class="my-4">
                Predicts whether a track contains no vocals. “Ooh” and “aah”
                sounds are treated as instrumental in this context. Rap or
                spoken word tracks are clearly “vocal”. The closer the
                instrumentalness value is to 1.0, the greater likelihood the
                track contains no vocal content. Values above 0.5 are intended
                to represent instrumental tracks, but confidence is higher as
                the value approaches 1.0.
              </p>
            </div>
            <div id="tempo" v-if="featureDropDown[selectedAf] == 'tempo'">
              <p class="my-4">
                The overall estimated tempo of a track in beats per minute
                (BPM). In musical terminology, tempo is the speed or pace of a
                given piece and derives directly from the average beat duration.
              </p>
            </div>
          </b-modal>
        </div>
        <div id="min-max-value">
          <p>
            <b>minimum: {{ selectedAfMinValue }}</b>
          </p>
          <p>
            <b>maximum: {{ selectedAfMaxValue }}</b>
          </p>
        </div>
        <div id="trend-diagram">
          <trend
            :data="audioFeatures[selectedAf].value[0]"
            :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
            auto-draw
            smooth
          ></trend>
        </div>
      </div>
    </div>
    <div id="bar-diagram-container" v-if="averageAf.length > 0">
      <div id="average-af-title">
        <p>
          <b>average values of all audio features</b>
        </p>
      </div>
      <div id="bar-diagram">
        <bars :data="averageAf" :gradient="['#6fa8dc', '#42b983']" :barWidth="35" :growDuration="1"></bars>
      </div>
    </div>
    <h4 v-if="authenticationError !== ''">
      Sorry! An error ocurred:
      <br />
      <font color="red">{{ authenticationError }}</font>
    </h4>
  </div>
</template>

<script>
import router from "../router";
import {
  dataFilter,
  getHashParams,
  round,
  millisToMinutesAndSeconds
} from "../utils/utils";
import {
  featureSelection,
  availableAudioFeatures,
  featureProperties
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

  updated: function() {
    if (this.selectedAf !== null) {
      this.getMinMaxValue();
    }
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
      const SELECTED_AUDIOFEATURES = 7;
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
      const DURATION_MS = 8;
      if (this.selectedAf !== null) {
        let minVal = Math.min(...this.audioFeatures[this.selectedAf].value[0]);
        if (this.selectedAf == DURATION_MS) {
          this.selectedAfMinValue =
            millisToMinutesAndSeconds(minVal) +
            " " +
            featureProperties[this.selectedAf].unit;
        } else {
          this.selectedAfMinValue =
            round(minVal, 2) + " " + featureProperties[this.selectedAf].unit;
        }
      }
    },

    featureMaxValue: function() {
      const DURATION_MS = 8;
      if (this.selectedAf !== null) {
        let maxVal = Math.max(...this.audioFeatures[this.selectedAf].value[0]);
        if (this.selectedAf == DURATION_MS) {
          this.selectedAfMaxValue =
            millisToMinutesAndSeconds(maxVal) +
            " " +
            featureProperties[this.selectedAf].unit;
        } else {
          this.selectedAfMaxValue =
            round(maxVal, 2) + " " + featureProperties[this.selectedAf].unit;
        }
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

#playlistDropDown {
  margin-top: 30px;
}

#description {
  margin-top: 10px;
}

#container {
  width: 70%;
  margin: 0 auto;
}

@media (max-width: 600px) {
  #container {
    width: 95%;
    margin: 0 auto;
  }
}

@media (min-width: 1200px) {
  #container {
    width: 50%;
    margin: 0 auto;
  }
}

@media (min-width: 1800px) {
  #container {
    width: 25%;
    margin: 0 auto;
  }
}

#min-max-value {
  margin-top: 30px;
}

#average-af-title {
  margin-top: 40px;
}

#bar-diagram-container {
  margin-bottom: 100px;
}

.my-4 {
  color: black;
}
</style>
