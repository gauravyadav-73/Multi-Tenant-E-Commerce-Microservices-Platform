server:
  port: 8080

spring:
  application:
    name: api-gateway
  cloud:
    gateway:
      routes:
        - id: product-service
          uri: lb://product-service
          predicates:
            - Path=/api/v1/products/**
      default-filters:
        - DedupeResponseHeader=Access-Control-Allow-Origin