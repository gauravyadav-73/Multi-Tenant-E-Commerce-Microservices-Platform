server:
  port: 8081

spring:
  application:
    name: product-service
  datasource:
    url: jdbc:postgresql://postgres:5432/ecommerce_db
    username: postgres
    password: postgrespassword
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        multiTenancy: SCHEMA
        tenant_identifier_resolver: com.ecommerce.shared.tenant.TenantIdentifierResolver
        multi_tenant_connection_provider: com.ecommerce.shared.tenant.SchemaMultiTenantConnectionProvider
  data:
    redis:
      host: redis
      port: 6379

eureka:
  client:
    service-url:
      defaultZone: http://eureka-server:8761/eureka/

resilience4j:
  circuitbreaker:
    instances:
      productServiceCB:
        sliding-window-size: 10
        failure-rate-threshold: 50
        wait-duration-in-open-state: 5s