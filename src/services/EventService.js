// Initiate spotify web api request with specified url and accessToken
export const initRequest = (accessToken, url) => {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + accessToken);
  myHeaders.append("Content-Type", "application/json");

  const requestConfig = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default"
  };

  async function r(requestConfig, url) {
    const myRequest = new Request(url, requestConfig);
    const response = await fetch(myRequest);
    const result = await response.json();
    return result;
  }

  return r(requestConfig, url);
};

export const getUserData = accessToken => {
  const url = "https://api.spotify.com/v1/me";
  async function res() {
    let response = await initRequest(accessToken, url);
    return response.id;
  }
  return res();
};

export const getUserPlaylists = (accessToken, userId) => {
  let url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  async function res() {
    let response = await initRequest(accessToken, url);
    return response;
  }

  return res();
};

export const getPlaylistTracks = (accessToken, playlistId) => {
  const fields = "items(track(id,name,href,artists))";
  let url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  url += "?fields=" + encodeURIComponent(fields);
  async function res() {
    let response = await initRequest(accessToken, url);
    return response;
  }
  return res();
};

// Gets audio features of several tracks
export const getAudioFeatures = (accessToken, trackIds) => {
  let fields = "";
  for (let i = 0; i < trackIds.length; i++) {
    if (i === trackIds.length - 1) {
      fields += trackIds[i];
    } else {
      fields += trackIds[i] + ",";
    }
  }

  let url = "https://api.spotify.com/v1/audio-features";
  url += "?ids=" + encodeURIComponent(fields);

  async function res() {
    let response = await initRequest(accessToken, url);
    return response;
  }

  return res();
};
