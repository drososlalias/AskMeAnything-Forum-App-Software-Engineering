const session = require('express-session');
const config = require('config');
require('custom-env').env('localhost');
const db = process.env.DB;
const MongoDBStore = require('connect-mongodb-session')(session);

const storeSessions = () =>
    new MongoDBStore({
        uri: db,
        collection: 'sessions',
    });

module.exports = storeSessions;
