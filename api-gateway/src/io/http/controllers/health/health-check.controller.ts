import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  @Get()
  async healthCheck() {
    return 'hi from nimamleo';
  }
}
