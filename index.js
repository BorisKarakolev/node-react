const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bodyParser = require('body-parser')
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

const app = express();

mongoose.connect(keys.mongoURI);

app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require('./routes/billingRoutes')(app)

const PORT = process.env.PORT || 6900;
app.listen(PORT);
