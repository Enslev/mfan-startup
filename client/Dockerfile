FROM node:22-slim

RUN mkdir /usr/client
WORKDIR /usr/client

# add `/usr/client/node_modules/.bin` to $PATH
ENV PATH /usr/client/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/client/package.json
RUN npm install

# add app
COPY . /usr/client

EXPOSE 4200

# start app
# CMD npm start
CMD npm start

