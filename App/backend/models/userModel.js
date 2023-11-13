const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /.+@.+\..+/ },
  password: { type: String, required: true, minlength: 6 },
  isWalker: { type: Boolean, required: true, default: false },
  fullName: { type: String, required: true, maxlength: 100 },
  address: { type: String, required: false },
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);
module.exports = User;
