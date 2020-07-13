import { ApiProperty } from '@nestjs/swagger';

export class Currencies {
  @ApiProperty()
  currencies: any;

  @ApiProperty()
  status: string;
}
