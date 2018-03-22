FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/eventlistener
WORKDIR /usr/src/eventlistener

# EH
ENV EVENTHUBCONNSTRING=
ENV EVENTHUBPATH=

# ACK Logging
ENV TEAMNAME=

# Bundle app source
COPY . .

# Install app dependencies
RUN npm install


CMD [ "node", "eventlistener.js" ]