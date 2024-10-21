const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
1. Diseño modelo
Diseñar un modelo Mongoose de "Post" con al menos los siguientes campos y validaciones en su esquema:
- id: string
- createdAt: Date
- updatedAt: Date
- title: string, requerido, más de 5 caracteres
- text: string, requerido, más de 5 caracteres
- author: string, requerido
*/

const schema = new Schema({
  title: {
    type: String,
    required: 'Título es requerido',
    maxlength: 300,
    minlength: 5
  },
  text: {
    type: String,
    required: 'Texto es requerido',
    maxlength: 500,
    minlength: 5
  },
  author: {
    type: String,
    required: 'Autor es requerido',
    maxlength: 300
  },
  createdAt: {
    type: Date,
    required: 'Fecha creación es requerido',
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: 'Fecha actualización es requerido',
    default: Date.now
  }
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
      delete ret._id;
      return ret;
    }
  }
});

const Post = mongoose.model('Post', schema);
module.exports = Post;
