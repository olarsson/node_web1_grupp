const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//Schema för användarna
const UserSchema = mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true }
});

//Hook som kör innan användaren sparas till DB för att hasha och salta lösenordet
UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next()
  bcrypt.genSalt((error, salt) => {
    if (error) return next(error)
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error)
      user.password = hash;
      next()
    });
  });
});

//Metod för kontroll av lösenord
UserSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.password, (error, match) => {
    if (error) return callback(error)
    callback(null, match);
  });
}

module.exports = mongoose.model('User', UserSchema);
