# 🐾 API Adopciones (Node.js + Express + MongoDB)
Backend para gestionar usuarios, mascotas y adopciones.  
Incluye autenticacion por JWT (cookie), documentacion Swagger y tests funcionales con Mocha/Chai/Supertest.

## 📂 Imagen publica en Docker Hub
https://hub.docker.com/r/exelara/adopciones-api

## ⚙️ Construir imagen localmente
docker build -t exelara/adopciones-api:latest .

## 💻 Windows PowerShell( ` como continuador de linea)
docker run --name adopciones-api `
  -p 4000:4000 `
  -e PORT=4000 `
  -e MONGO_URI="mongodb+srv://<user>:<pass>@cluster0.lhgghkl.mongodb.net/<db>" `
  -e JWT_SECRET="mi_clave" `
  exelara/adopciones-api:latest
-Reemplazar <user>, <pass> y <db> por los datos de tu cuenta de MongoDB Atlas.

## 💻 Linux / Mac ( \ como continuador de linea)
docker run --name adopciones-api \
  -p 4000:4000 \
  -e PORT=4000 \
  -e MONGO_URI="mongodb+srv://<user>:<pass>@cluster0.lhgghkl.mongodb.net/<db>" \
  -e JWT_SECRET="mi_clave" \
  exelara/adopciones-api:latest

-Reemplazar <user>, <pass> y <db> por los datos de tu cuenta de MongoDB Atlas.

## 🔑 Variables de entorno requeridas
- `MONGO_URI`: Cadena de conexion a tu base MongoDB Atlas.  
- `JWT_SECRET`: Clave secreta para firmar tokens JWT (elige una cadena segura).
- `PORT`: Puerto en el que se expone la API (ejemplo: 4000).

## 📋 Uso del proyecto
Una vez que el contenedor este corriendo:
- Swagger UI (documentacion interactiva):  
    🔸http://localhost:4000/api/docs  
- Endpoints principales:  
    🔹GET /api/users → Listado de usuarios  
    🔹GET /api/pets → Listado de mascotas  
    🔹POST /api/pets → Crear mascota  
    🔹POST /api/sessions/register → Registrar usuario  
    🔹POST /api/adoptions/:uid/:pid → Crear adopcion  
    🔹GET /api/adoptions → Listado de adopciones  
    🔹GET /api/adoptions/:aid → Detalle de adopcion

### 🧪 Tests
El proyecto incluye tests funcionales para el modulo de adopciones.
- Ejecutar:   npm test

Los tests requieren que MONGO_URI apunte a una base valida. Se recomienda usar una base separada para testing.