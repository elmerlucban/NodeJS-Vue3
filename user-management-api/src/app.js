const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Cors = require("cors");
const app = express();
const port = process.env.PORT;
const googleSecretKey = process.env.GOOGLE_SECRET_KEY;
require("dotenv").config();
require('./keys');

const userRouter = require('./routes/user.routes');
const authGoogleRoutes = require('./routes/authGoogle.routes');

app.use(Cors());
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.json());
app.use(session({ secret: googleSecretKey, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json(), userRouter, authGoogleRoutes);

app.listen(port, () => console.log("server running on port:" + port))
