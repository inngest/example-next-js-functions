FROM node:16.13-alpine
RUN apk --no-cache add ca-certificates
WORKDIR /data
COPY package*.json yarn.lock ./
RUN yarn --production
COPY . ./
RUN yarn build
ENTRYPOINT [ "node", "./inngest-run.js", "pages/api/hello.js" ]