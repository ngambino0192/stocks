# Start with alpine Node image official
FROM node:10.13.0-alpine as production

RUN adduser -D -g '' admin

# Run updates and install deps
RUN apk update && apk upgrade

# Run install for native build tools
RUN apk add --no-cache bash git openssh

ENV APP_PATH /home/stocks/app

#Create app directory
RUN mkdir -p $APP_PATH

#Change permission on app directory
RUN chown -R admin $APP_PATH

#Set WORKDIR to run CMD from
WORKDIR $APP_PATH

#Switch to user
USER admin

#Install dependencies
COPY package.json $APP_PATH
RUN yarn install

#Run remove for native build tools
USER root
RUN apk del bash git openssh

#Add application files
USER admin
COPY . $APP_PATH

#Start the application
CMD ["CI=true yarn start"]