const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const passport = require("passport");
const connectDB = require("./config/db");

dotenv.config();

require("./config/passport")(passport);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());

// Session middleware stores login session data
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

// Passport middleware uses the session to remember logged-in users
app.use(passport.initialize());
app.use(passport.session());

// OAuth routes
app.use("/auth", require("./routes/auth"));

// Main API routes
app.use("/", require("./routes"));

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
