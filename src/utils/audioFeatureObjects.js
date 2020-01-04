// Audio features which has been choosen to be available
export let availableAudioFeatures = [
  { value: [], title: "danceability" },
  { value: [], title: "energy" },
  { value: [], title: "speechiness" },
  { value: [], title: "acousticness" },
  { value: [], title: "liveness" },
  { value: [], title: "valence" },
  { value: [], title: "tempo" },
  { value: [], title: "duration_ms" }
];

export const featureProperties = [
  { title: "danceability", unit: "" },
  { title: "energy", unit: "" },
  { title: "speechiness", unit: "" },
  { title: "acousticness", unit: "" },
  { title: "liveness", unit: "" },
  { title: "valence", unit: "" },
  { title: "tempo", unit: "bpm" },
  { title: "duration", unit: "min" }
];

const audioFeatureSelection = featureProperties => {
  let features = {};
  for (let i = 0; i < featureProperties.length; i++) {
    features[i] = featureProperties[i].title;
  }
  return features;
};

export let featureSelection = audioFeatureSelection(featureProperties);
console.log(featureSelection);
