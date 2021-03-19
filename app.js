//core dependencies
const exp = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookier = require("cookie-parser");

//routes
const bookRoute = require("./routes/books");
const userRoute = require("./routes/users");
// const tokenCheck = require("./middleware/token");

//configurations
const app = exp();
dotenv.config();
app.use(cookier());
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.send("<h1>Libooh,</h1> <h4>a neighboorhood library API</h4>");
});
app.use("/books", bookRoute);
app.use("/users", userRoute);

//database
mongoose
  .connect(process.env.mDBurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(
    // if it runs in docker the PORT = 5000
    app.listen(process.env.PORT || 5000, () => {
      console.log(process.env.PORT || 5000);
    })
  )
  .catch((err) => {
    console.log(err);
  });
