const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
