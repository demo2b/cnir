#!/usr/bin/env node
/**
 * @author Jonas.Fournel
 * @fileOverview
 */
const port = 3000

const express = require('express')
const { engine } = require('express-handlebars');
const app = express()

app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: require('./handlebars-helpers/helpers')
}));

app.set('view engine', '.hbs');
app.set('views', './src/main/views');

app.use(express.static('./src/main/statics'));
require('./routes/routes')(app);

app.listen(port, () => {
    console.log(`CNIR app listening on port ${port}`)
})
