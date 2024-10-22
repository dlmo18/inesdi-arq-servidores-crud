const express = require("express");
const router = express.Router();
const posts = require("../controllers/posts.controller");
const users = require("../controllers/users.controller");
const tokens = require("../config/tokens.config");

router.post("/users", users.create);
router.get("/users/:id", tokens.auth, users.get);
router.post("/login", users.login);

router.post("/posts", tokens.auth, posts.create);
router.get("/posts", tokens.auth, posts.list);
router.get("/posts/:id", tokens.auth, posts.detail);
router.patch("/posts/:id", tokens.auth, posts.edit);
router.delete("/posts/:id", tokens.auth, posts.delete);

/*Mail para habilitar usuario*/
router.get("/users/verify/:code", users.verify);

module.exports = router;
