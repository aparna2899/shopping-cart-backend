var monogoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()

const secret = process.env.SECRET

const Schema = monogoose.Schema;

var userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, minlength: 6, required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function(next) {
  try {
    if (this.password && this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
      console.log(this.password)
    }
    next();
  } catch (error) {
    return error;
  }
});

userSchema.methods.verifyPassword = async function(password) {
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (error) {
    return error;
  }
};

userSchema.methods.signToken = async function(){
  var payload = {
    userId : this.id,
    email : this.email
  };
  try {
    var token = await jwt.sign(payload,secret)
    return token;
  } catch (error) {
    return error
  }
}

userSchema.methods.userJSON = function(token) {
  return {
    username : this.username,
    email : this.email,
    token : token
  }
}

const User = monogoose.model('User', userSchema);

module.exports = User;
