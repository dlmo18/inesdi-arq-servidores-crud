const createError = require('http-errors');
const Post = require('../models/post.model');

module.exports.list = (req, res, next) => {
  Post.find()
    .then(posts => res.json(posts))
    .catch(next);
}

module.exports.detail = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        res.json(post)
      } else {
        next(createError(404, 'Post no encontrado'))
      }
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  const { id } = req.params;

  Post.findByIdAndDelete(id, function(err, model) {
      //console.log('model',model,err);
      if(!model) {
        res.status(404).json({ error: `Post ID ${req.params.id} no encontrado.` });
      } else{
          return model;
      }
    })
    .then(() => {
      res.status(204).json({ message: `Post ID ${req.params.id} eliminado correctamente.` });
    })
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const data = { text } = req.body

  Post.create({
    ...data
  })
    .then(post => res.status(201).json(post))
    .catch(next)
}

module.exports.edit = (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  Post.findByIdAndUpdate(id, data, function(err, model) {
      //console.log('model',model,err);
      if(!model) {
        res.status(404).json({ error: `Post ID ${req.params.id} no encontrado.` });
      } else{
          return model;
      }
    })
    .then(() => {
      res.status(200).json({ message: `Post ID ${req.params.id} actualizado correctamente.` });
    })
    .catch(next);

}

