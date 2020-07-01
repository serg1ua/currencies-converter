FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./
COPY pm2.config.js .
RUN npm install
RUN npm install pm2 -g
COPY ./ ./
RUN npm run build
EXPOSE 3000
CMD ["pm2-runtime", "start", "pm2.config.js"]
