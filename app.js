//core dependencies
const exp = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookier = require("cookie-parser");

//routes
const bookRoute = require("./routes/books");
const userRoute = require("./routes/users");
const adminRoute = require("./routes/admin");
// const tokenCheck = require("./middleware/token");

//configurations
const app = exp();
dotenv.config();
app.use(cookier());
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
app.use(exp.static("public"));
app.set("view engine", "ejs");

//routes
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/books", bookRoute);
app.use("/users", userRoute);
app.use("/admins", adminRoute);

//database
mongoose
  .connect(process.env.mDBurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(
    // if it runs in docker the PORT = 5000
    app.listen(5000, "0.0.0.0", () => {
      console.log(5000);
    })
  )
  .catch((err) => {
    console.log(err);
  });
