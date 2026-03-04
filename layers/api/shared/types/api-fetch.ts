export interface ApiFetchRequestContext {
  options: {
    method: string;
    headers: Record<string, string>;
    body?: unknown;
  };
}

export interface ApiFetchResponseErrorContext {
  response: {
    status: number;
    data: unknown;
  };
  options: ApiFetchRequestContext["options"];
  retry: () => Promise<void>;
}

export interface ApiFetchHooks {
  onRequest?: (context: ApiFetchRequestContext) => void | Promise<void>;
  onResponseError?: (
    context: ApiFetchResponseErrorContext,
  ) => void | Promise<void>;
}
