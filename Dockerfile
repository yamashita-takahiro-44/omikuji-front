# Dockerfile for React
FROM node:20.5.1
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
RUN npm run build

# Serve the app
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
EXPOSE 3000
