import axios from "axios";
import { RequestTool } from "./request";

axios.defaults.baseURL = "https://localhost:7007/api";

axios.interceptors.request.use((config) => {
  const authorization = localStorage.getItem("authorization");

  // eslint-disable-next-line no-param-reassign
  config.headers = {
    Authorization: `Bearer ${authorization}`,
    "accept-language": "en-US,en;q=0.5",
  };
  RequestTool.removePendingRequest(config);
  RequestTool.addPendingRequest(config);

  return config;
});

axios.interceptors.response.use(
  (response) => {
    RequestTool.removePendingRequest(response.config);
    return response;
  },
  (error) => {
    RequestTool.removePendingRequest(error.config || {});
    if (axios.isCancel(error)) {
      throw new Error(`Duplicate request cancelled：${error.message}`);
    } else {
      // add exception handling
    }
    return Promise.reject(error);
  }
);

class Axios {
  public static get<T, U>(url: string, params: T): Promise<U> {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  public static post<T, U>(url: string, data: T): Promise<U> {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then((response) => resolve(response.data))
        .catch((err) => reject(err));
    });
  }
}

export default Axios;
