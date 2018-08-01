import { Get, Controller, Options, HttpCode, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Options()
  @HttpCode(HttpStatus.NO_CONTENT)
  respondToOptions(): void {}
}
