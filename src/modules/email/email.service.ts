import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { google } from 'googleapis';
const OAuth2 = google.auth.OAuth2;
import config from '../../config';

const {
  userEmail,
  serviceEmail,
  googleClientId,
  googleClientSecret,
  googleRefreshToken,
  googleOauthRedirectUrl,
} = config;

@Injectable()
export class EmailService {
  private oauth2Client =  new OAuth2(
    googleClientId,
    googleClientSecret,
    googleOauthRedirectUrl,
  );
  public async sendEmail(payload: string): Promise<void> {
    this.oauth2Client.setCredentials({
      refresh_token: googleRefreshToken,
    });
    const accessToken = this.oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
      // @ts-ignore
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: serviceEmail,
        clientId: googleClientId,
        clientSecret: googleClientSecret,
        refreshToken: googleRefreshToken,
        accessToken,
      },
    });

    await smtpTransport.sendMail({
      from: serviceEmail,
      to: userEmail,
      subject: 'Currency conversion rate',
      html: `<p>${payload}</p>`,
    });
  }
}
