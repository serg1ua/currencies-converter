import { ApiProperty } from '@nestjs/swagger';

export class CurrencyResponse {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  base_currency_code: string;

  @ApiProperty()
  base_currency_name: string;

  @ApiProperty()
  rates: any;
  status: string;

  @ApiProperty()
  updated_date: string;
}
