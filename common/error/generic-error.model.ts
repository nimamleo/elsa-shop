import { GenericErrorCode } from "../enums/error.enum";

export class GenericError {
  constructor(
    private readonly message: string,
    code: GenericErrorCode,
    err: Error,
  ) {}
}
