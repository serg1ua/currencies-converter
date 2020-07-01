import { Controller, Get, Param } from '@nestjs/common';
import { ConverterService } from './converter.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IResponse } from './interfaces/converter.interfaces';

@ApiTags('Currencies-converter')
@Controller('converter')
export class ConverterController {
  constructor(private readonly converter: ConverterService) {}
  @Get(':query')
  @ApiOperation({
    summary: 'Example of query string: ?amount=10&from=USD&to=UAH',
  })
  public getRate(@Param('query') query: string): Promise<IResponse> {
    return this.converter.getRate(query);
  }
}
