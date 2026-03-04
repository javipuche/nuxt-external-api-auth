import type { H3Event } from "h3";

export const addApiFetchHooks = (event: H3Event, hook: ApiFetchHooks) => {
  if (!event.context.apiFetchHooks) {
    event.context.apiFetchHooks = [];
  }

  (event.context.apiFetchHooks as ApiFetchHooks[]).push(hook);
};

export const executeOnRequestHooks = async (
  event: H3Event,
  context: ApiFetchRequestContext,
) => {
  const hooksList = (event.context.apiFetchHooks ?? []) as ApiFetchHooks[];

  for (const hooks of hooksList) {
    await hooks.onRequest?.(context);
  }
};

export const executeOnResponseErrorHooks = async (
  event: H3Event,
  context: ApiFetchResponseErrorContext,
) => {
  const hooksList = (event.context.apiFetchHooks ?? []) as ApiFetchHooks[];

  for (const hooks of hooksList) {
    await hooks.onResponseError?.(context);
  }
};
