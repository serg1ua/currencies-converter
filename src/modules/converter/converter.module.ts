import { Module } from '@nestjs/common';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';
import { EmailService } from '../email/email.service';

@Module({
  controllers: [ConverterController],
  providers: [ConverterService, EmailService],
})
export class ConverterModule {}
