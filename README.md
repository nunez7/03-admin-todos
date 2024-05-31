# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
```
docker compose up -d
```
2. Crear una copia del .env.template y renombrarlo a .env 
3. Reemplazar las vars de configuración (variables de entorno)
4. Ejecutar ``` npm install ```
5. Ejecutar ``` npm run dev ```
6. Ejecutar comandos de prisma:
    - npx prisma migrate dev
    - npx prisma generate
7. Crear la BD local, ejecutando el endpoint [localhost:3000/api/seed] para cread la DB con datos

## Nota: Usuario por defecto para app
__Usuario:__ test1@google.com
__Password:__ 12345678

# Prisma commands
```
npx prisma init

npx prisma migrate dev

npx prisma generate
```

# Prod




# Stage
