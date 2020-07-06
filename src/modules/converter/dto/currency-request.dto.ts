import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CurrencyRequest {
  @ApiProperty()
  public amount: number;

  @ApiProperty()
  from: string;

  @ApiProperty()
  to: string;

  @ApiPropertyOptional()
  email?: string;
}
