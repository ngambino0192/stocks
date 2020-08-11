FROM node:10

# Run updates and install deps
# RUN apk update && apk upgrade

ENV APP_PATH /home/app

#Create app directory
RUN mkdir -p $APP_PATH

#Set WORKDIR to run CMD from
WORKDIR $APP_PATH

#Install dependencies
COPY package.json $APP_PATH
RUN yarn install
RUN yarn global add nodemon

#Add application files
COPY . $APP_PATH

#Open port on host
EXPOSE 6969

#Start the application
CMD yarn start