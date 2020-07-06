import { Controller, Post, Body } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CurrencyRequest } from './dto/currency-request.dto';
import { CurrencyResponse } from './dto/currency-response.dto';

@ApiTags('Currencies-converter')
@Controller('converter')
export class ConverterController {
  constructor(private readonly converter: ConverterService) {}
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Response from the converter',
    type: CurrencyResponse,
  })
  public getRate(@Body() dto: CurrencyRequest): Promise<CurrencyResponse> {
    return this.converter.getRate(dto);
  }
}
