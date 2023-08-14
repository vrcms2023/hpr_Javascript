import axios from "axios";
import { getBaseURL } from "./ulrUtil";
import { getCookie } from "./cookieUtil";
import { toast } from "react-toastify";

export const axiosServiceApi = axios.create({
  baseURL: getBaseURL(),
  headers: {
    Accept: "application/json",
    "Content-type": "application/json",
  },
});

const requestInterceptorRequestHanler = async (config) => {
  //const navigate = useNavigate();

  try {
    const accessToken = getCookie("userToken");
    if (!accessToken) return false;
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  } catch (error) {
    window.location = "/login";
  }
};

const requestInterceptorErrortHanler = async (error) => {
  return Promise.reject(error);
};

const responseInterceptorResponseHanler = async (response) => {
  return response;
};

const responseInterceptorErrortHanler = async (error) => {
  if (error.response.status == 404) {
    toast("Unable to Process your request");
    return Promise.reject(error.response.data.message);
  }
  return Promise.reject(error);
  //   if (error.config) {
  //     window.location = "/login";
  //   } else {
  //     Promise.reject(error);
  //   }
};

axiosServiceApi.interceptors.request.use(
  requestInterceptorRequestHanler,
  requestInterceptorErrortHanler,
);
axiosServiceApi.interceptors.response.use(
  responseInterceptorResponseHanler,
  responseInterceptorErrortHanler,
);
