require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRouter = require("./routes/user.route.js");
const authRouter = require("./routes/auth.route.js");
const categoryRouter = require("./routes/category.route.js");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middlewares/errors.js")

const app = express();

// cors allow url
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// create data from json request
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie
app.use(cookieParser());


// api
app.use("/api", userRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);

app.use(errorMiddleware);

// port
const { port } = process.env;
app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
