#!/usr/bin/env node
/**
 * @author Jonas.Fournel
 * @fileOverview
 */
const https = require("https");
const express = require('express');
const fs = require('fs');
const { engine } = require('express-handlebars');
const i18n = require('i18n');

const httpsPort = 443;
const httpPort = 80;

const mySQLPool = require('./db/my-sql-init')();

const app = express();

i18n.configure({
    locales: ['fr', 'en'],
    cookie: 'locale',
    directory: __dirname + '/i18n',
    defaultLocale: 'fr',
});

// Creating Server on port 443 with HTTPS
https.createServer({
        key: fs.readFileSync("client-key.pem"),
        cert: fs.readFileSync("client-cert.pem"),
    },app)
    .listen(httpsPort, () => {
        console.log(`CNIR app listening on port ${httpsPort}`)
    });
// Creating Server on port 80 with HTTP
app.listen(httpPort, () => {
    console.log(`CNIR app listening on port ${httpPort}`)
});

// Registering our custom handlebar helpers on HBS engine
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: require('./handlebars/handlebars-helpers')(i18n)
}));

// Registering .hbs extension as file extension to recognize files
app.set('view engine', '.hbs');
// Defining view folder for dynamic rendering
app.set('views', './src/main/server/views');
// Defining public static folders for public files as images, fonts, etc..
app.use(express.static('./src/main/public/statics', {
    maxAge : 3600 * 1000
}));
// Defining i18n module
app.use(i18n.init);

// Adding HTML routes into our application
require('./routes/routes')(app, mySQLPool);

