import axios from "axios";
import { getBaseURL } from "./ulrUtil";
import { getCookie } from "./cookieUtil";


axios.defaults.baseURL = getBaseURL();
/**
 * Axios API call with Access token
 */
export const axiosServiceApi = axios.create({
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

export const axiosClientServiceApi = axios.create({
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

const requestInterceptorRequestHanler = async (config) => {
  try {
    const accessToken = getCookie("userToken");
    if (!accessToken) return false;
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  } catch (error) {
    window.location = "/login";
  }
};

const requestInterceptorClientRequestHanler = async (config) => {
  return config;
};

const requestInterceptorErrortHanler = async (error) => {
  return Promise.reject(error);
};

const responseInterceptorResponseHanler = async (response) => {
  return response;
};

const responseInterceptorErrortHanler = async (error) => {
  if (error.response.status == 404) {
    return Promise.reject(error.response.data.message);
  }
  return Promise.reject(error);
};

axiosServiceApi.interceptors.request.use(
  requestInterceptorRequestHanler,
  requestInterceptorErrortHanler,
);
axiosServiceApi.interceptors.response.use(
  responseInterceptorResponseHanler,
  responseInterceptorErrortHanler,
);

axiosClientServiceApi.interceptors.request.use(
  requestInterceptorClientRequestHanler,
  requestInterceptorErrortHanler,
);
axiosClientServiceApi.interceptors.response.use(
  responseInterceptorResponseHanler,
  responseInterceptorErrortHanler,
);
