import type { ExternalApiErrorCode } from "../types/envelope";

export const API_ERROR_CODES: Record<string, ExternalApiErrorCode> = {
  INVALID_ACCESS_TOKEN: "INVALID_ACCESS_TOKEN",
  INVALID_REFRESH_TOKEN: "INVALID_REFRESH_TOKEN",
} as const;
