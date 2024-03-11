import axios, { InternalAxiosRequestConfig } from "axios";

import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

const customAxios = axios.create({
  baseURL: `https://api.tvmaze.com`,
});

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  console.error(`[request error] [${JSON.stringify(error)}]`);
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

customAxios.interceptors.request.use(
  (request) => onRequest(request),
  (error) => onRequestError(error)
);

customAxios.interceptors.response.use(
  (response) => onResponse(response),
  (error) => onResponseError(error)
);

export default customAxios;
