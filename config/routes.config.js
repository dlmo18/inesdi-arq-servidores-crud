const express = require('express');
const router = express.Router();
const posts = require('../controllers/posts.controller')
const users = require('../controllers/users.controller')
const tokens = require('../config/tokens.config');

/*
Codificar los siguientes endpoints HTTP sobre el API:

POST /api/users
- No necesita estar autenticada
- Recibe body JSON con los campos name, email, password y bio
- Almacena el usuario en Base de Datos en memoria cifrando su contraseña (el cifrado de la contraseña es opcional)

2. POST /api/login
- Recibe body con email, password
- Devuelve HTTP 200 OK con token JWT de sesión si las credenciales son correctas
- Devuelve HTTP 400 en caso de error en la validación de datos
- Devuelve HTTP 401 si las credenciales no son correctas
*/
router.post('/users', users.create)
router.get('/users/:id', tokens.auth, users.get)
router.post('/login', users.login)

/*
4. El resto de endpoints de nuestra API (CRUD de Posts) deben requerir autenticación y devolver código HTTP 401 ante peticiones no autenticadas.
*/
router.post('/posts', tokens.auth,  posts.create)
router.get('/posts', tokens.auth, posts.list)
router.get('/posts/:id', tokens.auth, posts.detail)
router.patch('/posts/:id', tokens.auth, posts.edit)
router.delete('/posts/:id', tokens.auth, posts.delete)


module.exports = router;
