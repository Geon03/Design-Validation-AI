import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DesignValidationModule } from './design-validation/design-validation.module';

@Module({
  imports: [DesignValidationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
