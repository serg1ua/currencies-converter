import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { CurrencyRequest } from './dto/currency-request.dto';
import { Currencies, CurrencyRate } from './entity';
import { EmailService } from '../email/email.service';
import config from '../../config';

const { URL, RAPIDAPI_KEY, RAPIDAPI_HOST } = config;
const headers = {
  'content-type': 'application/octet-stream',
  'x-rapidapi-host': RAPIDAPI_HOST,
  'x-rapidapi-key': RAPIDAPI_KEY,
  useQueryString: true,
};

@Injectable()
export class ConverterService {
  constructor(private readonly emailService: EmailService) {}
  public async getList(): Promise<Currencies> {
    try {
      const res = await axios({
        method: 'GET',
        url: `${URL}/list`,
        headers,
        params: { format: 'json' },
      });
      const result: Currencies = res.data;
      return result;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  public async getRate(dto: CurrencyRequest): Promise<CurrencyRate> {
    const { amount, from, to, email } = dto;
    const params: CurrencyRequest = {
      amount,
      from,
      to,
    };
    let res = null;
    try {
      res = await axios({
        method: 'GET',
        url: `${URL}/convert`,
        headers,
        params: Object.assign({ format: 'json' }, params),
      });
    } catch (err) {
      throw new InternalServerErrorException(err, 'Convertion error');
    }
    // send email if provided, don't wait for response or error
    if (email) {
      this.emailService.sendEmail(JSON.stringify(res.data));
    }
    const response: CurrencyRate = res.data;
    return response;
  }
}
