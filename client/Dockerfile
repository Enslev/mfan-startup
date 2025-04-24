FROM node:22-slim

WORKDIR /usr/client

# Copy only the package files to leverage caching and prevent overwriting
COPY package*.json ./

# Install Angular CLI and dependencies
RUN npm install -g @angular/cli
RUN npm install

# Now copy everything else
COPY . .

EXPOSE 4200

CMD ["npm", "start"]
