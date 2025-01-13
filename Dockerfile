FROM node:20-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json, yarn.lock to the container
COPY package*.json ./
COPY yarn.lock ./

# Copy client-sdk to the container
COPY client-sdk ./client-sdk

# Install dependencies
RUN yarn

# Copy the entire project to the container
COPY . .
COPY .env.example .env

# Build the Next.js application
RUN yarn build

# Use the official Nginx image as the final image
FROM node:20-alpine AS production

# Set the working directory in the container
WORKDIR /app

# Copy the build output from the build image to the production image
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/next.config.mjs ./next.config.mjs
COPY --from=build /app/.env ./.env

# Expose the port that the app runs on
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]
