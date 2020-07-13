import { Controller, Post, Get, Body } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { CurrencyRequest } from './dto/currency-request.dto';
import { Currencies, CurrencyRate } from './entity';

@ApiTags('Currencies-converter')
@Controller('converter')
export class ConverterController {
  constructor(private readonly converter: ConverterService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get currencies list',
  })
  public getList(): Promise<Currencies> {
    return this.converter.getList();
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Response from the converter',
    type: CurrencyRate,
  })
  public getRate(@Body() dto: CurrencyRequest): Promise<CurrencyRate> {
    return this.converter.getRate(dto);
  }
}
