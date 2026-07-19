# This is obviously meant for development
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "--host"]
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]