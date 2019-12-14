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
