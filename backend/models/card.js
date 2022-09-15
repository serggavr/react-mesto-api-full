const mongoose = require('mongoose');
const { linkValidationPattern } = require('../constants/validationPattern');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'обязательно для заполнения'],
    minlength: [2, 'должно содержать минимум 2 символа'],
    maxlength: [30, 'должно содержать максимум 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'обязательно для заполнения'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    default: [],
  },
  createdAt: {
    type: Date,
  },
});

// eslint-disable-next-line func-names
const linkValidator = function (value) {
  return linkValidationPattern.test(value);
};

cardSchema.path('link').validate(linkValidator, 'error');

module.exports = mongoose.model('card', cardSchema);
