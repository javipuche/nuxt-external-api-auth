import type { NitroFetchOptions, NitroFetchRequest } from "nitropack";
import type { ExternalApiErrorData } from "./envelope";

export interface ApiClientResponseContext {
  response: {
    status: number;
    data: unknown;
  };
}

export interface ApiClientResponseErrorContext {
  response: {
    status: number;
    data: ExternalApiErrorData;
  };
}

declare module "nuxt/app" {
  interface RuntimeNuxtHooks {
    "api:response-error": (
      context: ApiClientResponseErrorContext,
    ) => void | Promise<void>;
    "api:response": (
      context: ApiClientResponseContext,
    ) => void | Promise<void>;
  }
}

export interface ApiFetchOptions {
  method?: string;
  headers: Record<string, string>;
  body?: unknown;
}

export interface ApiFetchResponse<T = unknown> {
  status: number;
  data: T;
}

export interface ApiFetchOnRequestContext {
  options: ApiFetchOptions;
}

export interface ApiFetchOnResponseErrorContext {
  response: ApiFetchResponse;
  options: ApiFetchOptions;
  retry: () => Promise<void>;
}

export interface ApiFetchHooks {
  onRequest?: (context: ApiFetchOnRequestContext) => void | Promise<void>;
  onResponseError?: (
    context: ApiFetchOnResponseErrorContext,
  ) => void | Promise<void>;
}

export type ApiClientFetchOptions = NitroFetchOptions<NitroFetchRequest>;

export type ApiClientRequestOptions = Omit<ApiClientFetchOptions, "body"> & {
  payload?: ApiClientFetchOptions["body"];
};
