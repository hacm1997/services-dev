FROM node:18-alpine3.17

# Copy package.json and package-lock.json to the working directory
COPY package.json .

COPY tsconfig.json .

COPY .npmrc .
# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the TypeScript code
RUN npm run build

COPY dist .

# Start the NestJS application
CMD ["npm", "start"]

# Expose the port that the application will run on
EXPOSE 8080
