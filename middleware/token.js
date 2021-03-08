const jwt = require("jsonwebtoken");

module.exports.auth = async (req, res, next) => {
  const token = req.cookies.jwt;
  //   console.log(token);
  if (token) {
    const auth = await jwt.verify(
      token,
      "Its so cold outside,I'm alone,I'm alright"
    );
    if (auth) {
      next();
    } else {
      res.send("ACCESS DENIED");
    }
  }
};
