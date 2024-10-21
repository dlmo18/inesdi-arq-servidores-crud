const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts.controller')


/*
Codificar los siguientes endpoints de acceso público (sin autenticación necesaria)
1. POST /api/posts
- Recibe body JSON con los campos title, text y author.
- Devuelve HTTP 201 con el detalle JSON del Post creado en la Base de Datos en memoria
- Devuelve HTTP 400 si hay errores en la validación del body de la petición contra el esquema definido

2. GET /api/posts
- Devuelve HTTP 200 OK con el listado JSON de posts almacenados en la Base de Datos en memoria

3. GET /api/posts/<id>
- Devuelve 200 OK con detalle de un Post JSON almacenado en la Base de Datos en memoria
- Devuelve 404 si el post no existe en la Base de Datos en memoria

4. PATCH /api/posts/<id>
- Recibe body JSON con alguno de los campos title, text y author.
- Devuelve 200 OK con detalle de un Post JSON almacenado en la Base de Datos en memoria tras modificar sus atributos con lo indicado en el body
- Devuelve 404 si el post no existe en la Base de Datos en memoria

5. DELETE /api/posts/<id>
- Devuelve HTTP 204 tras eliminar el post id == <id> de la Base de Datos en memoria
- Devuelve 404 si el post no existe en la Base de Datos en memoria
*/

router.post('/posts', posts.create)
router.get('/posts', posts.list)
router.get('/posts/:id', posts.detail)
router.patch('/posts/:id', posts.edit)
router.delete('/posts/:id', posts.delete)

module.exports = router;
