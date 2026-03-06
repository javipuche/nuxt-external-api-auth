export class ApiClientError extends Error {
  public readonly statusCode: number;
  public readonly data: ExternalApiErrorData;

  constructor(statusCode: number, data: ExternalApiErrorData) {
    super(data.message);
    this.name = "ApiClientError";
    this.statusCode = statusCode;
    this.data = data;
  }
}
