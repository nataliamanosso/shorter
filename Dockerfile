# ===========================
# Stage 1: Build Frontend
# ===========================
FROM node:20 AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build

# ===========================
# Stage 2: Build Backend
# ===========================
FROM node:20 AS backend-builder

WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci

COPY backend/ .
COPY --from=frontend-builder /app/frontend/dist ./public

# ===========================
# Stage 3: Final Image
# ===========================
FROM node:20

WORKDIR /app

COPY --from=backend-builder /app/backend ./

EXPOSE 5000
CMD ["node", "src/index.js"]
