const mongoose = require('mongoose');
const Schema = mongoose.Schema
const PASSWORD_PATTERN = /^.{8,}$/;
const EMAIL_PATTERN = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: 'Nombre es requerido'
    },
    email: {
        type: String,
        required: 'Email es requerido',
        match: [EMAIL_PATTERN, 'Email en formato inválido'],
        unique: true
    },
    password: {
        type: String,
        required: 'Un password válido es requerido',
        match: [PASSWORD_PATTERN, 'Password en formato inválido']
    },
    bio: {
        type: String,
        maxlength: 200
    },
    active: {
        type: Boolean,
        default: false
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
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
    
            return ret
        }
    },
    toObject: {
        transform: (doc, ret) => {
            ret.id = doc._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret
        }
    }
})

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10).then((hash) => {
            this.password = hash;
            next();
        });
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

userSchema.statics.checkEmail = function (emailToCheck) {
  return EMAIL_PATTERN.test(emailToCheck); 
};

const User = mongoose.model('User', userSchema);
module.exports = User;
