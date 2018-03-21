FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/eventlistener
WORKDIR /usr/src/eventlistener

# EH
ENV EVENTHUBCONNSTRING=
ENV EVENTHUBPATH=

# ACK Logging
ENV TEAMNAME=

# Install app dependencies
RUN npm install

# Bundle app source
ADD / . 

CMD [ "node", "eventlistener.js" ]