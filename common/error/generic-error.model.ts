import { GenericStatusCodes } from "../enums/status.enum";

export class GenericError {
  _message: string;
  _code: GenericStatusCodes;
  _err: Error;

  constructor(err: Error | any, code?: GenericStatusCodes) {
    if (err instanceof Error) {
      this._message = err.message;
      this._err = err;
    } else {
      this._message = err;
      this._err = err;
    }
    this._code = code || GenericStatusCodes.INTERNAL;
  }
}
