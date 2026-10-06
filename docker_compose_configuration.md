version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    container_name: ecommerce-postgres
    environment:
      POSTGRES_DB: ecommerce_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./init-tenant-schemas.sql:/docker-entrypoint-initdb.d/init-tenant-schemas.sql

  redis:
    image: redis:alpine
    container_name: ecommerce-redis
    ports:
      - "6379:6379"

  eureka-server:
    build: ./eureka-server
    container_name: eureka-server
    ports:
      - "8761:8761"

  api-gateway:
    build: ./api-gateway
    container_name: api-gateway
    ports:
      - "8080:8080"
    depends_on:
      - eureka-server

  product-service:
    build: ./product-service
    container_name: product-service
    ports:
      - "8081:8081"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/ecommerce_db
      SPRING_DATA_REDIS_HOST: redis
    depends_on:
      - postgres
      - redis
      - eureka-server

  react-frontend:
    build: ./frontend
    container_name: react-frontend
    ports:
      - "3000:3000"

volumes:
  pgdata: