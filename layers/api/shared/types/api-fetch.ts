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
    _data: unknown;
  };
  options: ApiFetchRequestContext["options"];
  /** Call to retry the request with the current (mutated) options. */
  retry: () => Promise<void>;
}

/**
 * Generic hooks that layers can register on `event.context.apiFetchHooks`
 * to extend apiFetch behavior without coupling layers to each other.
 *
 * Hooks receive mutable context objects — modify them directly.
 * Multiple layers can push hooks — apiFetch executes ALL of them.
 */
export interface ApiFetchHooks {
  /** Called before each request. Mutate `ctx.options` to add headers, etc. */
  onRequest?: (ctx: ApiFetchRequestContext) => void;
  /**
   * Called on error responses. Mutate `ctx.options` and call `ctx.retry()`
   * to re-execute the request with the updated options.
   */
  onResponseError?: (ctx: ApiFetchResponseErrorContext) => Promise<void>;
}
