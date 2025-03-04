# Stage 1: Build Stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./

# Define build-time ARGuments (if needed during build)
ARG REACT_APP_API_PORT
ARG REACT_APP_API_HOST
ARG REACT_APP_SELF_URL

# Set ENVironment variables during build (if needed during build)
ENV REACT_APP_API_PORT=$REACT_APP_API_PORT
ENV REACT_APP_API_HOST=$REACT_APP_API_HOST
ENV REACT_APP_SELF_URL=$REACT_APP_SELF_URL

RUN npm run build

# Stage 2: Production Stage (Nginx)
FROM nginx:alpine

# Copy the build output from the build stage to the nginx html folder
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]