
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:alpine
COPY --from=build /app/dist/rk_ecommerce_web /usr/share/nginx/html
EXPOSE 4201
CMD ["nginx", "-g", "daemon off;"]