FROM node:10

# Run updates and install deps
# RUN apk update && apk upgrade

ENV APP_PATH /home/backend

#Create app directory
RUN mkdir -p $APP_PATH

#Set WORKDIR to run CMD from
WORKDIR $APP_PATH

#Install dependencies
COPY package.json $APP_PATH
RUN npm install
RUN npm install nodemon -g

#Add application files
COPY . $APP_PATH

#Open port on host
EXPOSE 6969

#Start the application
CMD npm start