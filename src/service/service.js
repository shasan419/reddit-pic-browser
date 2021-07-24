import config from "../config/config.json";

async function performApiCall() {
  const response = await fetch(`${config.apiUrl}`)
    .then((res) => res.json())
    .catch((e) => console.log(e));
  return response;
}

export default performApiCall;
