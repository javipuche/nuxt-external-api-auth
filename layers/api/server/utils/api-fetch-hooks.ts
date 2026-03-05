import type { H3Event } from "h3";

const getApiFetchHooks = (event: H3Event) => {
  if (!event.context.apiFetchHooks) {
    event.context.apiFetchHooks = [];
  }
  return event.context.apiFetchHooks as ApiFetchHooks[];
};

export const addApiFetchHooks = (event: H3Event, hook: ApiFetchHooks) => {
  const hooks = getApiFetchHooks(event);
  hooks.push(hook);
};

export const executeOnRequestHooks = async (
  event: H3Event,
  context: ApiFetchOnRequestContext,
) => {
  const hooks = getApiFetchHooks(event);

  for (const hook of hooks) {
    await hook.onRequest?.(context);
  }
};

export const executeOnResponseErrorHooks = async (
  event: H3Event,
  context: ApiFetchOnResponseErrorContext,
) => {
  const hooks = getApiFetchHooks(event);

  for (const hook of hooks) {
    await hook.onResponseError?.(context);
  }
};
