import { GenericStatusCodes } from "../enums/status.enum";
import { Result } from "../result";

export class StdResponse<T> {
  public status: number;
  public message: string;
  public data: T;

  constructor(message: string, status: GenericStatusCodes, data: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static fromResult<T>(
    result: Result<T>,
    message: string = "",
  ): StdResponse<T> {
    if (result.isOK()) {
      return new StdResponse<T>(message, GenericStatusCodes.Ok, result.value);
    }
    if (result.isError()) {
      return new StdResponse<T>(
        result.err._err.message,
        result.err._code,
        null,
      );
    }
  }
}
