const jwt = require("jsonwebtoken");
const tokens = require("../config/tokens.config");
const mailer = require("../services/mailer.service");
const createError = require("http-errors");
const User = require("../models/user.model");

module.exports.create = (req, res, next) => {
  const data = ({ name, email, bio, password } = req.body);

  User.create({
    ...data,
  })
    .then((user) => {
      mailer.sendVerificationEmail(user);
      res.status(201).json(user);
    })
    .catch(next);
};

module.exports.get = (req, res, next) => {
  User.findById(req.params.id)

    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        next(createError(404, "Usuario no encontrado"));
      }
    })
    .catch(next);
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => res.status(204).end())
    .catch(next);
};

module.exports.update = (req, res, next) => {
  const { id } = req.params;
  const data = ({ name, bio, password } = req.body);

  if (req.file) {
    data.avatar = req.file.path;
  }

  User.findByIdAndUpdate(id, data, { new: true })
    .then((user) => res.status(200).json(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  if (!User.checkEmail(req.body.email)) {
    res.status(400).json({ message: `Email en formato inválido.` });
    return;
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      user.checkPassword(req.body.password).then((match) => {
        if (match) {
          const token = tokens.createSession(user);
          res.header("Set-Cookie", `session_token=${token}`);
          res.json({ token: token });
        } else {
          res.status(401).json({ message: `Clave inválida.` });
        }
      });
    } else {
      res.status(404).json({ message: `Usuario ${req.body.email} no existe.` });
    }
  });
};

module.exports.verify = (req, res, next) => {
  const code = req.params.code;

  if (!code) {
    next(createError(404, "Código inválido"));
  } else {
    const info = jwt.verify(code, "bankai");

    User.findById(info.user_id).then((user) => {
      if (user) {
        user.status = true;
        user.save().then(() => {
          res
            .status(200)
            .json({ message: `Usuario habilitado correctamente.` });
        });
      } else {
        res
          .status(404)
          .json({ message: `ID de Usuario ${user_id} no existe.` });
      }
    });
  }
};
