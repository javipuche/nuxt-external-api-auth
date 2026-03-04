export class ExternalApiError extends Error {
  public readonly code: ApiErrorCode;
  public readonly statusCode: number;
  public readonly errors?: Record<string, string[]>;

  constructor(statusCode: number, body: ApiErrorResponse) {
    super(body.message);
    this.name = "ExternalApiError";
    this.code = body.code as ApiErrorCode;
    this.statusCode = statusCode;
    this.errors = body.errors;
  }
}

export const throwApiError = (error: ExternalApiError): never => {
  throw createError({
    statusCode: error.statusCode,
    statusMessage: error.message,
    data: {
      code: error.code,
      errors: error.errors,
    },
  });
};
