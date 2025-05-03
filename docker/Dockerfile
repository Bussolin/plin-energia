FROM node:20

WORKDIR /app

COPY ./package* ./tsconfig.json ./startup.sh ./tsconfig.build.json ./nest-cli.json /app
COPY ./src /app/src
COPY ./prisma /app/prisma

RUN npm install
RUN npm run build
RUN npm run prisma:generate

RUN rm -rf /app/src/
RUN rm -rf /app/tsconfig.build.json
RUN rm -rf /app/tsconfig.json
RUN rm -rf /app/nest-cli.json

RUN chmod +x /app/startup.sh

CMD ["./startup.sh"]
