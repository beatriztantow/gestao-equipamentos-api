FROM node:20

ENV NODE_ENV=production
ENV POSTGRES_HOST=db
ENV POSTGRES_PORT=5432
ENV POSTGRES_USER=userdb
ENV POSTGRES_PASSWORD=passworddb
ENV POSTGRES_DB=equipmentdb

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /workspace

COPY . .

RUN npm install

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN rm -rf /dist

RUN npm run build

EXPOSE 3000

CMD ["/entrypoint.sh"]