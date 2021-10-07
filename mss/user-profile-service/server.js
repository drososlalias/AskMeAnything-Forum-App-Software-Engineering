const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const eventSync = require('./config/eventSync');
const app = express();

connectDB();
eventSync();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Define Routes

app.use('/', require('./routes/profile.js'));

const PORT = process.env.PORT;

app.listen(PORT, () =>
    console.log(`User Profile service running on port ${PORT}`)
);
