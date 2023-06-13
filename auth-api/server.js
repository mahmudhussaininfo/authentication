const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoDBConnect = require("./config/db");
const corsOptions = require("./config/corsSetup");
const errorHandler = require("./middlewares/errorHandler");
const userRoute = require("./routes/UserRoutes");
const authRoute = require("./routes/AuthRoute");

//initial
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

//enviroment vars
const PORT = process.env.PORT || 9090;

//routing
app.use("/api/v1/mamu", userRoute);
app.use("/api/v1/auth", authRoute);

//error handler
app.use(errorHandler);

//listen
app.listen(PORT, () => {
  mongoDBConnect();
  console.log(`server is running on ${PORT}`.bgCyan.green);
});
