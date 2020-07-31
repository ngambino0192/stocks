FROM node:10

# Run updates and install deps
# RUN apk update && apk upgrade

ENV APP_PATH /home/client

#Create app directory
RUN mkdir -p $APP_PATH

#Set WORKDIR to run CMD from
WORKDIR $APP_PATH

#Install dependencies
COPY package.json $APP_PATH
RUN npm install

#Add application files
COPY . $APP_PATH

#Open port on host
EXPOSE 3000

#Start the application
CMD yarn start