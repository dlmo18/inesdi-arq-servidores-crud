# Arquitectua de servidores Express.JS

## Caracteristicas
Se incluye el uso de:

**express.js** para desarrollo de API Services

**jest** para pruebas unitarias

**supertest** para pruebas HTTP de servicios

## Comandos disponibles

Previo al lanzamiento asegurar que se tenta estos valore en en el archiv .ENV
```
SECRET_KEY="bankai"
PORT=8000
SENDGRID_API_KEY="reemplazar por un api send grid"
```
Si *SENDGRID_API_KEY* esta vacio no envia el mail, solo muestra en la consola la URL

Inicio de funcionalidades
```
npm start
```

Inicio de funcionalidades modo dev
```
npm run dev
```

Pruebas unitarias
```
npm test
```
En caso el puerto 8000 este ocupado se puede usar el comando siguiente para liberarlo
```
npx kill-port 8000
```