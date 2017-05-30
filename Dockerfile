FROM node:7

WORKDIR /app
ADD package.json /app/package.json
RUN npm install
RUN npm install -g serve

ADD . /app

EXPOSE 5000
CMD ["serve", "-s", "build"]
