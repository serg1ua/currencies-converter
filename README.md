# Currency Conversion Server

## Environment
**1. Create .env file in root directory**

  1. NODE_ENV=[dev, production]
  2. PORT=3000
  3. RAPIDAPI_KEY=347f77c644msh62b7bb0cd51a660p1460cfjsncd83fd6af691
  4. GOOGLE_EMAIL=<example@gmail.com>
  5. GOOGLE_CLIENT_ID=<client_id>
  6. GOOGLE_CLIENT_SECRET=<client_secret>
  7. GOOGLE_REFRESH_TOKEN=<refresh_token>
  8. GOOGLE_OAUTH_REDIRECT_URL=<redirect_url>

## Run locally:

Run:
```shell
npm i
npm run start
```
Stop:
```shell
npm run stop
```
Navigate to http://localhost:3000/api

## Production in Docker:

Run: 
```shell
npm run prod
```
Navigate to http://localhost:3000/api

## Query string example:

```shell
?amount=10&from=USD&to=UAH
```

