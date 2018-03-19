FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/eventlistener
WORKDIR /usr/src/eventlistener

# EH
ENV EVENTHUBCONNSTRING=
ENV EVENTHUBPATH=

# ACK Logging
ENV TEAMNAME=

# Mongo/Cosmos
ENV MONGOURL=

# RabbitMQ
ENV RABBITMQHOST=
ENV PROCESSENDPOINT=

# Install app dependencies
RUN npm install

# Bundle app source
ADD / . 

CMD [ "node", "eventlistener.js" ]