# Stage 1: Build the React app (with placeholders)
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production image using Nginx
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Copy and enable the runtime substitution script
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
