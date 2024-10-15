import { Result } from "../result";
import { StdResponse } from "../std-response/std-response.model";
import { Response } from "express";
import { GenericStatusCodes } from "../enums/status.enum";

export abstract class AbstractHttpController {
  protected sendResult<T>(response: Response, data: Result<T>): void {
    const stdResponse = StdResponse.fromResult(data);
    response
      .status(stdResponse.status)
      .send({ ...stdResponse, status: GenericStatusCodes[stdResponse.status] });
  }
}
