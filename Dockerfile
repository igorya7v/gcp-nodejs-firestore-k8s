FROM node:8
# define working directory for docker
WORKDIR /usr/src/app
# copy all our source code into the working directory
COPY . .
# install npm dependencies
RUN npm install --only=production
# expose port 8080 for our server to run on
EXPOSE 8080
# command to start our server
CMD [ "npm", "start" ]