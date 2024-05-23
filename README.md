# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
```
docker compose up -d
```
2. Renombrar el .env.template a .env 
3. Reemplazar las vars de configuración
4. Ejecutar [localhost:3000/api/seed] para cread la DB con datos

# Prisma commands
```
npx prisma init

npx prisma migrate dev

npx prisma generate
```

# Prod




# Stage
