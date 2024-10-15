export class Result<T> {
  constructor(
    private readonly _value: T,
    private readonly _error: any,
  ) {}

  isOK(): boolean {
    return true;
  }

  isError(): boolean {
    return !!this._error;
  }
}

export function Ok<T>(value: T): Result<T> {
  return new Result<T>(value, null);
}
export function Err(): Result<any> {
  // return new Result<any>(n);
  return;
}
