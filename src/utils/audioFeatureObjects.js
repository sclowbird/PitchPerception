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

const audioFeatureSelection = af => {
  let features = {};
  for (let i = 0; i < af.length; i++) {
    features[i] = af[i].title;
  }
  return features;
};

export let featureSelection = audioFeatureSelection(availableAudioFeatures);
