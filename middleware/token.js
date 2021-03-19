const jwt = require("jsonwebtoken");

module.exports.auth = async (req, res, next) => {
  const token = req.cookies.jwt;
  //   console.log(token);
  if (token) {
    jwt.verify(
      token,
      "Its so cold outside,I'm alone,I'm alright",
      (err, decoded) => {
        if (err) res.redirect("users/");
        else {
          console.log(decoded);
          next();
        }
      }
    );
  } else {
    res.redirect("users/");
  }
};
