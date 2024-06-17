FROM node:20

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