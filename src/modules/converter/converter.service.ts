import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import axios from 'axios';
import { CurrencyRequest } from './dto/currency-request.dto';
import { CurrencyResponse } from './dto/currency-response.dto';
import { EmailService } from '../email/email.service';
import config from '../../config';
import { CONSTANTS } from '../../config/constants';

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
  public async getRate(dto: CurrencyRequest): Promise<CurrencyResponse> {
    const { amount: amountStr, from, to, email } = dto;
    if (!amountStr || !from || !to) {
      throw new BadRequestException('Invalid input');
    }
    if (isNaN(amountStr) || Number(amountStr) <= 0) {
      throw new BadRequestException(
        'Invalid input: Amount should be a positive number',
      );
    }
    const amount = Number(amountStr);
    const params: CurrencyRequest = {
      amount,
      from,
      to,
    };
    let res = null;
    try {
      res = await axios({
        method: 'GET',
        url: URL,
        headers,
        params: Object.assign({ format: 'json' }, params),
      });
    } catch (err) {
      throw new InternalServerErrorException(err, 'Convertion error');
    }
    // send email if provided, don't wait for response or error
    if (email) {
      if (!CONSTANTS.emailRe.test(email)) {
        throw new BadRequestException('Invalid input: invalid email');
      }
      this.emailService.sendEmail(JSON.stringify(res.data));
    }
    const response: CurrencyResponse = res.data;
    return response;
  }
}
