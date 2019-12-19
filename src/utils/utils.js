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
