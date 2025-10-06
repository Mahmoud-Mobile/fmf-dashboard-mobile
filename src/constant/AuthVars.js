import getEnvVars from "./Environment";

const { apiUrl, amplitudeApiKey, socketUrl } = getEnvVars();
export default {
  API_LINK: apiUrl,
  API_KEY: amplitudeApiKey,
  SOCKET_LINK: socketUrl,
};
