FROM node:20

WORKDIR /app

# COPY package*.json ./

# RUN npm install

# COPY . .

EXPOSE 3000

CMD [ "node_modules/nodemon/bin/nodemon.js", "dist/server.js" ]
# CMD [ "node_modules/nodemon/bin/nodemon.js", "dist/server.js" ]
