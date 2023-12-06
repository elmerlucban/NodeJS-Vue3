const express = require('express');
const Cors = require("cors");
const app = express();
const port = process.env.PORT;
require("dotenv").config();
require('./keys');

const userRouter = require('./routes/user.routes');

app.use(Cors());
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.json(), userRouter);

app.listen(port, () => console.log("server running on port:" + port))
