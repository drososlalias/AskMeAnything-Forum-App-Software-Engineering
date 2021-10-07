const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const session = require("express-session");
const storeSessions = require("./config/sessiondb");
const { pageNotFound } = require("./controllers/layout/404");
const flash = require("connect-flash");

//Create new express app
const app = express();

//Create new Session Store
const store = storeSessions();

//Connect to Database
connectDB();

//Set ejs as our template engine and views to be our views folder
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Create Session
app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store: store,
    }),
);

//Use the public folder to apply styling in every page
app.use(express.static(path.join(__dirname, "public")));

//Use flash in order to create alert messages
app.use(flash());

//Save variables to res.local so that can be used in our views
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.user = req.session.user;
    next();
});

// Project Endpoints
app.use("/", require("./routes/layout/landing.js"));
app.use("/", require("./routes/auth/login.js"));
app.use("/", require("./routes/auth/register.js"));
app.use("/", require("./routes/layout/about.js"));
app.use("/", require("./routes/layout/contactus.js"));
app.use("/", require("./routes/layout/coursematerials.js"));
app.use("/", require("./routes/auth/logout.js"));
app.use("/", require("./routes/posts/posts.js"));
app.use("/", require("./routes/profile/profile"));
app.use(pageNotFound);

// Port that our app is listening
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`MVC Server started on ${PORT}`));
