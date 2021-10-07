const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//Define Routes

app.use('/', require('./routes/authentication'));

const PORT = process.env.PORT;

app.listen(PORT, () =>
    console.log(`Authentication-service running on port ${PORT}`)
);
