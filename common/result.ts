import { GenericError } from "./error/generic-error.model";
import { GenericStatusCodes } from "./enums/status.enum";

export class Result<T> {
  constructor(
    private readonly _value: T,
    private readonly _error: GenericError,
  ) {
    if (this.isError() && this.isOK()) {
      this._value = null;
    }
    if (!this.isError() && !this.isOK()) {
      this._error = new GenericError(
        "Unknown error",
        GenericStatusCodes.INTERNAL,
      );
    }
  }

  get value(): T {
    if (this.isError()) {
      throw this._error._err;
    }
    return this._value;
  }

  get err(): GenericError {
    if (this.isOK()) {
      throw new GenericError(
        `Result has value: ${this._value}`,
        GenericStatusCodes.INTERNAL,
      );
    }
    return this._error;
  }

  isOK(): boolean {
    return this._value !== undefined && this._value !== null;
  }

  isError(): boolean {
    return !!this._error;
  }
}

export function Ok<T>(value: T): Result<T> {
  return new Result<T>(value, null);
}
export function Err(
  e: GenericError | Error | string,
  code?: GenericStatusCodes,
): Result<any> {
  if (e instanceof GenericError) {
    return new Result<any>(null, e);
  }
  if (e instanceof String || typeof e === "string") {
    return new Result<any>(
      null,
      new GenericError(new Error(e as string), code),
    );
  }

  return new Result<any>(null, new GenericError(e, code));
}
