import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';
import { IConverter, IResponse } from './interfaces/converter.interfaces';
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
  public async getRate(query: string): Promise<IResponse> {
    const [amountStr, from, to] = query.split('&');
    const amount = Number(amountStr.split(/\=/)[1]);
    const params: IConverter = {
      amount: amount ? amount : 1,
      from: from.split(/\=/)[1],
      to: to.split(/\=/)[1],
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
    // send email don't wait for response or error
    this.emailService.sendEmail(JSON.stringify(res.data));
    const response: IResponse = res.data;
    return response;
  }
}
