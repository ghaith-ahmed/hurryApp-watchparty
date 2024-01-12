const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectDB");
const userRoutes = require("./routes/userRoutes.js");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const path = require("path");

app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:5173"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
connectDB();
app.use("/api/users", userRoutes);

const server = app.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`)
);
