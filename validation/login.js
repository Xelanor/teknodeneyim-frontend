const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.username)) {
    errors.username = 'Kullanıcı adı gereklidir';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Şifre en az 6 haneli olmalıdır';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Lütfen şifre girin';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}