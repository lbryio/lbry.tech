FROM node:10.2.1

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
 
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]