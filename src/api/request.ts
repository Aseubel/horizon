import axios, { AxiosHeaders } from "axios";

const _axios = axios.create({
  // baseURL: "http://8.134.200.160:611", // import.meta.env.VITE_BACKEND_API_BASE_URL,
});

// 请求拦截器
_axios.interceptors.request.use(
  (config) => {
    config.headers = new AxiosHeaders({
      Authorization: "aaaaa",
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
_axios.interceptors.response.use(
  (response) => {
    // 2xx
    return response;
  },
  (error) => {
    // 4xx or 5xx
    console.log(error);
    return Promise.resolve(error.response);
  }
);

export default _axios;
