const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const userRouter = require("./routes/userRoutes");
const api = require("./routes/apiRoutes")
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_URL);

app.use(helmet());

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
  });

app.use("/user", userRouter);
app.use("/api", api);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
