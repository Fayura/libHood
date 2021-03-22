const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");

const adminSchema = new mongoose.Schema({
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
});

adminSchema.pre("save", async function (next) {
  console.log("before hook", this);
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
