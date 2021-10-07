const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const session = require('express-session');
const storeSessions = require('./config/sessiondb');
const app = express();
const store = storeSessions();
const flash = require('connect-flash');
connectDB();
const { pageNotFound } = require('./controllers/layout/404');
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.user = req.session.user;
    next();
});
app.use('/', require('./routes/layout/landing.js'));
app.use('/', require('./routes/auth/login.js'));
app.use('/', require('./routes/auth/register.js'));
app.use('/', require('./routes/layout/about.js'));
app.use('/', require('./routes/layout/contactus.js'));
app.use('/', require('./routes/layout/coursematerials.js'));
app.use('/', require('./routes/auth/logout.js'));
app.use('/', require('./routes/posts/posts.js'));
app.use('/', require('./routes/profile/profile'));
app.use(pageNotFound);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Client service running on ${PORT}`));
