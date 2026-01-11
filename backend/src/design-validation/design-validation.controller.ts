import { Controller, Post, Body } from '@nestjs/common';
import { DesignValidationService } from './design-validation.service';

@Controller('design')
export class DesignValidationController {
  constructor(private readonly service: DesignValidationService) {}

  @Post('validate')
  validate(@Body() body: { freeTextInput: string }) {
    return this.service.validateDesign(body);
  }
}
