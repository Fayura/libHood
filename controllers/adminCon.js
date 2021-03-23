const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//models
const Admin = require("../models/admin");

// error handling
const handleErrors = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("admin validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.createadmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    const token = await jwt.sign(
      { id: admin._id },
      "Its so cold outside,I'm alone,I'm alright"
    );
    res.cookie("jwt", token, {
      httpOnly: true,
    });
    res.status(201).send("SUCCESS");
  } catch (err) {
    const errors = handleErrors(err);
    res.status(500).json(errors);
  }
};

module.exports.logIn = async (req, res) => {
  const email = req.body.email;
  const admin = await Admin.findOne({ email });
  if (admin) {
    const auth = await bcrypt.compare(req.body.password, admin.password);
    if (auth) {
      const token = await jwt.sign(
        { id: admin._id },
        "Its so cold outside,I'm alone,I'm alright"
      );
      res.cookie("jwt", token, {
        httpOnly: true,
      });
      res.json({ login: "SUCCESS" });
    }
  }
  res.json({ login: "FAILURE" });
};
