import axios from "axios";
import queryString from "query-string";

import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: {
    serialize: (params) =>
      queryString.stringify({
        ...params,
        api_key: apiConfig.apiKey,
        language: apiConfig.language,
      }),
  },
});

axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (err) => {
    console.log(
      "There has been a problem with your fetch operation: " + err.message
    );
    throw err;
  }
);

export default axiosClient;
