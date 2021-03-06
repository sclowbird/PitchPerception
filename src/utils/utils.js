export const getHashParams = () => {
  var hashParams = {};
  var e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(2);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

export const round = (value, precision) => {
  let multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

export const millisToMinutesAndSeconds = ms => {
  let minutes = Math.floor(ms / 60000);
  let seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};

export const dataFilter = (response, wrapper, ...args) => {
  let responseDataArray = [];
  for (let i = 0; i < args.length; i++) {
    let tempArr = [];
    for (let j of response[wrapper]) {
      if (j !== null) {
        tempArr.push(j[args[i]]);
      } else {
        continue;
      }
    }
    responseDataArray.push(tempArr);
  }
  return responseDataArray;
};
