import Qs from "qs";
import axios, { AxiosRequestConfig } from "axios";

export class RequestTool {
  static pendingRequest = new Map();

  static generateReqKey(config: AxiosRequestConfig<unknown>): string {
    const { method, url, params, data } = config;
    return [method, url, Qs.stringify(params), Qs.stringify(data)].join("&");
  }

  static addPendingRequest(config: AxiosRequestConfig<unknown>): void {
    const requestKey = RequestTool.generateReqKey(config);
    // eslint-disable-next-line no-param-reassign
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!RequestTool.pendingRequest.has(requestKey)) {
          RequestTool.pendingRequest.set(requestKey, cancel);
          console.log();
        }
      });
  }

  static removePendingRequest(config: AxiosRequestConfig<unknown>): void {
    const requestKey = RequestTool.generateReqKey(config);
    if (RequestTool.pendingRequest.has(requestKey)) {
      const cancelToken = RequestTool.pendingRequest.get(requestKey);
      cancelToken(requestKey);
      RequestTool.pendingRequest.delete(requestKey);
    }
  }
}
