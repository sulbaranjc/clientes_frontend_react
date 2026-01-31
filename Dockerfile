# ======================
# 1️⃣ Build React (Vite)
# ======================
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ======================
# 2️⃣ Producción (Nginx)
# ======================
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
