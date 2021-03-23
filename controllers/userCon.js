const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//models
const User = require("../models/users");

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
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};
module.exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await jwt.sign(
      { id: user._id },
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
  const user = await User.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(req.body.password, user.password);
    if (auth) {
      const token = await jwt.sign(
        { id: user._id },
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
module.exports.logOut = (req, res) => {
  res.cookie(jwt, "", { maxAge: 1 });
  res.redirect("/");
};
