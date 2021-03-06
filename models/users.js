const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  phNo: {
    type: Number,
    required: false,
  },
  FlatNo: {
    type: Number,
    required: true,
  },
  lending: {
    type: Array,
    required: false,
  },
  reading: {
    type: Array,
    required: false,
  },
});

// before a user is saved
userSchema.pre("save", async function (next) {
  console.log("before hook", this);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
