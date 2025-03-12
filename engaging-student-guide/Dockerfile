FROM node:20-alpine

WORKDIR /app



# Copy package.json and install dependencies **while ignoring optional deps**
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]
